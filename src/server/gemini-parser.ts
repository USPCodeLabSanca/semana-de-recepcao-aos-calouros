import { GoogleGenAI, Type } from '@google/genai';
import { ScheduleEvent } from './db';

/**
 * Initializes Gemini client with required telemetry header
 */
function getGeminiClient(customApiKey?: string): GoogleGenAI {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Chave de API do Gemini não configurada (defina GEMINI_API_KEY no arquivo .env ou no servidor).');
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Used as few-shot reference when there is no published schedule yet
const FALLBACK_SAMPLE_EVENTS: ScheduleEvent[] = [
  { Data: '2026-02-23', Inicio: '08:00', Fim: '09:30', Titulo: 'Abertura', Descricao: '', Local: 'Salão de Eventos USP - São Carlos', type: '1' },
  { Data: '2026-02-23', Inicio: '10:00', Fim: '12:00', Titulo: 'Entrega do Kit Ingressante', Descricao: '', Local: 'Vão da Biblioteca', type: '1' },
];

/**
 * Response schema enforced by Gemini tool use / JSON schema
 */
const scheduleResponseSchema = {
  type: Type.ARRAY,
  description: 'Lista completa de eventos extraídos da planilha do cronograma da Semana de Recepção',
  items: {
    type: Type.OBJECT,
    properties: {
      Data: {
        type: Type.STRING,
        description: 'Data do evento no padrão ISO YYYY-MM-DD (ex: 2026-02-23)',
      },
      Inicio: {
        type: Type.STRING,
        description: 'Horário de início estritamente no padrão 24h HH:MM (ex: 08:00 ou 14:30)',
      },
      Fim: {
        type: Type.STRING,
        description: 'Horário de término estritamente no padrão 24h HH:MM (ex: 09:30 ou 17:00). Se não especificado na planilha, estime com base na próxima atividade ou adicione 1 hora.',
      },
      Titulo: {
        type: Type.STRING,
        description: 'Título oficial do evento ou atividade',
      },
      Descricao: {
        type: Type.STRING,
        description: 'Descrição, cursos relacionados, palestrantes ou observações adicionais',
      },
      Local: {
        type: Type.STRING,
        description: 'Local físico do evento (ex: Salão de Eventos USP, Auditório Fernão, Vão da Biblioteca, Redondo, CAASO)',
      },
      type: {
        type: Type.STRING,
        description: 'Tipo do evento no sistema. Padronize como "1"',
      },
    },
    required: ['Data', 'Inicio', 'Fim', 'Titulo', 'Local', 'type'],
  },
};

/**
 * Validates extracted events against schema constraints
 */
export function validateScheduleEvents(events: any[]): { isValid: boolean; errors: string[]; sanitized: ScheduleEvent[] } {
  const errors: string[] = [];
  const sanitized: ScheduleEvent[] = [];

  if (!Array.isArray(events)) {
    return { isValid: false, errors: ['O resultado gerado não é um array de eventos.'], sanitized: [] };
  }

  if (events.length === 0) {
    return { isValid: false, errors: ['Nenhum evento foi identificado na planilha.'], sanitized: [] };
  }

  events.forEach((ev, idx) => {
    const itemErrors: string[] = [];

    // Validate Data (YYYY-MM-DD)
    const dataMatch = String(ev.Data || '').trim().match(/^\d{4}-\d{2}-\d{2}$/);
    if (!dataMatch) {
      itemErrors.push(`Evento #${idx + 1} ("${ev.Titulo || 'Sem título'}"): Data inválida "${ev.Data}" (esperado YYYY-MM-DD).`);
    }

    // Validate Inicio (HH:MM)
    const inicioMatch = String(ev.Inicio || '').trim().match(/^([01]?\d|2[0-3]):[0-5]\d$/);
    if (!inicioMatch) {
      itemErrors.push(`Evento #${idx + 1}: Horário de início inválido "${ev.Inicio}" (esperado HH:MM).`);
    }

    // Validate Fim (HH:MM)
    const fimMatch = String(ev.Fim || '').trim().match(/^([01]?\d|2[0-3]):[0-5]\d$/);
    if (!fimMatch) {
      itemErrors.push(`Evento #${idx + 1}: Horário de término inválido "${ev.Fim}" (esperado HH:MM).`);
    }

    if (!ev.Titulo || String(ev.Titulo).trim() === '') {
      itemErrors.push(`Evento #${idx + 1}: Título obrigatório ausente.`);
    }

    if (itemErrors.length > 0) {
      errors.push(...itemErrors);
    } else {
      sanitized.push({
        Data: String(ev.Data).trim(),
        Inicio: String(ev.Inicio).trim().padStart(5, '0'),
        Fim: String(ev.Fim).trim().padStart(5, '0'),
        Titulo: String(ev.Titulo).trim(),
        Descricao: String(ev.Descricao || '').trim(),
        Local: String(ev.Local || '').trim(),
        type: String(ev.type || '1').trim(),
      });
    }
  });

  // Sort sanitized by Data and Inicio
  sanitized.sort((a, b) => {
    if (a.Data !== b.Data) return a.Data.localeCompare(b.Data);
    return a.Inicio.localeCompare(b.Inicio);
  });

  return {
    isValid: errors.length === 0,
    errors,
    sanitized,
  };
}

/**
 * Converts normalized spreadsheet text to official schedule JSON via Gemini 2.5 Flash
 */
export async function parseSpreadsheetWithGemini(
  spreadsheetText: string,
  sheetName: string,
  customApiKey?: string,
  referenceEvents: ScheduleEvent[] = []
): Promise<{ events: ScheduleEvent[]; rawModelOutput: string }> {
  const ai = getGeminiClient(customApiKey);

  // Take sample events from the published schedule as few-shot reference
  const fewShotSample = referenceEvents.length > 0 ? referenceEvents.slice(0, 8) : FALLBACK_SAMPLE_EVENTS;

  const prompt = `Você é o parser oficial do cronograma da Semana de Recepção aos Calouros do ICMC USP São Carlos.
Sua missão é ler o texto normalizado da planilha da comissão de recepção (onde as células mescladas de horários e dias já foram propagadas) e convertê-la rigorosamente para a lista de eventos no schema JSON oficial.

### SCHEMA OFICIAL ESPERADO (Exemplo real dos anos anteriores):
${JSON.stringify(fewShotSample, null, 2)}

### REGRAS OBRIGATÓRIAS:
1. **Datas**: Devem estar no formato YYYY-MM-DD. Se a planilha indicar "Domingo", "Segunda-feira", "46076 [Data: 2026-02-23]", associe a cada coluna o respectivo dia no formato correto.
2. **Horários**: Sempre em formato 24 horas "HH:MM" com dois dígitos (ex: "08:00", "09:30", "14:00").
3. **Locais**: Extraia o local da atividade exatamente como estiver indicado na planilha (ex: "Salão de Eventos USP - São Carlos", "Vão da Biblioteca", "Auditório Fernão", "Redondo", "Palquinho do CAASO", sala, laboratório, etc.). ATENÇÃO CRÍTICA: Mesmo se o evento NÃO tiver coordenadas conhecidas no mapa, ou o local estiver em branco/indefinido na planilha, VOCÊ DEVE OBRIGATORIAMENTE INCLUIR O EVENTO! Jamais omita ou descarte nenhum evento por falta de local ou coordenada; o organizador humano definirá e vinculará as coordenadas manualmente na página do evento no editor.
4. **Cursos/Detalhes**: Se houver divisão por cursos (ex: "BCC", "BSI", "BECD", "BMACC"), coloque essas divisões ou salas na 'Descricao' de forma organizada em Markdown.
5. **Tipo de Evento**: Use "1" no campo 'type'.
6. **Integridade**: Não invente nem omita eventos. Toda e qualquer atividade da recepção na planilha deve ser gerada como um evento na lista.

### CONTEÚDO NORMALIZADO DA PLANILHA (Aba: "${sheetName}"):
${spreadsheetText}
`;

  let modelName = 'gemini-2.5-flash';
  let attempts = 0;
  const maxAttempts = 2;
  let lastError: Error | null = null;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt + (attempts > 1 ? '\nATENÇÃO: A tentativa anterior falhou na validação de formato. Certifique-se de preencher rigorosamente todos os campos com horários HH:MM válidos e datas YYYY-MM-DD.' : ''),
        config: {
          systemInstruction: 'Você é um assistente especializado em extração estruturada de dados da USP São Carlos. Responda estritamente com o array JSON de acordo com o responseSchema fornecido.',
          temperature: 0.1,
          responseMimeType: 'application/json',
          responseSchema: scheduleResponseSchema,
        },
      });

      const outputText = response.text || '';
      const parsedJson = JSON.parse(outputText);
      const validation = validateScheduleEvents(parsedJson);

      if (validation.isValid && validation.sanitized.length > 0) {
        return {
          events: validation.sanitized,
          rawModelOutput: outputText,
        };
      }

      // If partial validation errors occurred, but some sanitized events exist and errors are minor
      if (validation.sanitized.length > 0 && attempts === maxAttempts) {
        return {
          events: validation.sanitized,
          rawModelOutput: outputText,
        };
      }

      throw new Error(`Falha de validação no JSON gerado: ${validation.errors.join('; ')}`);
    } catch (err: any) {
      lastError = err;
      // In case gemini-2.5-flash is unavailable, fallback to gemini-3.8-flash
      if (modelName === 'gemini-2.5-flash') {
        modelName = 'gemini-3.8-flash';
      }
    }
  }

  throw lastError || new Error('Não foi possível converter a planilha para o cronograma via LLM.');
}
