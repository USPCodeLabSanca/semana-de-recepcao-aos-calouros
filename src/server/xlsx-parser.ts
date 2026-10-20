import * as XLSX from 'xlsx';

export interface SheetInfo {
  name: string;
  rowCount: number;
  colCount: number;
  mergeCount: number;
}

/**
 * Converts an Excel serial date number (e.g. 46076) to YYYY-MM-DD
 */
export function excelDateToString(serial: number): string {
  // Excel base date: 1899-12-30 due to 1900 leap year bug
  const excelEpoch = new Date(Date.UTC(1899, 11, 30));
  const msPerDay = 86400000;
  const date = new Date(excelEpoch.getTime() + Math.floor(serial) * msPerDay);
  return date.toISOString().split('T')[0];
}

/**
 * Converts an Excel day fraction (e.g. 0.3333333333333333) to HH:MM
 */
export function excelTimeToHHMM(fraction: number): string {
  const totalMinutes = Math.round(fraction * 24 * 60);
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

/**
 * Inspects all sheets in an XLSX buffer
 */
export function inspectWorkbook(buffer: Buffer): SheetInfo[] {
  const wb = XLSX.read(buffer, { type: 'buffer' });
  return wb.SheetNames.map((name) => {
    const ws = wb.Sheets[name];
    const range = ws['!ref'] ? XLSX.utils.decode_range(ws['!ref']) : { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
    return {
      name,
      rowCount: range.e.r - range.s.r + 1,
      colCount: range.e.c - range.s.c + 1,
      mergeCount: (ws['!merges'] || []).length,
    };
  });
}

/**
 * Reads a sheet from the workbook, unmerges/propagates all merged cells,
 * and formats all values into a dense textual table.
 */
export function normalizeSheetToText(buffer: Buffer, sheetName?: string): { selectedSheet: string; textTable: string; rawMatrix: any[][] } {
  const wb = XLSX.read(buffer, { type: 'buffer', cellDates: true });
  const selectedSheet = (sheetName && wb.Sheets[sheetName]) ? sheetName : (wb.SheetNames.find((s) => s.toLowerCase().includes('cronograma') || s.toLowerCase().includes('programação')) || wb.SheetNames[0]);
  const ws = wb.Sheets[selectedSheet];

  if (!ws) {
    throw new Error(`Aba "${selectedSheet}" não encontrada na planilha.`);
  }

  // Handle merged cells: propagate values from top-left cell to all cells in the merge range
  const merges = ws['!merges'] || [];
  for (const merge of merges) {
    const startCellAddress = XLSX.utils.encode_cell({ r: merge.s.r, c: merge.s.c });
    const cellValue = ws[startCellAddress];
    if (cellValue !== undefined) {
      for (let R = merge.s.r; R <= merge.e.r; ++R) {
        for (let C = merge.s.c; C <= merge.e.c; ++C) {
          const targetAddress = XLSX.utils.encode_cell({ r: R, c: C });
          if (!ws[targetAddress]) {
            ws[targetAddress] = { ...cellValue };
          }
        }
      }
    }
  }

  // Convert sheet to array of rows
  const rawRows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

  // Format cells into readable strings
  const formattedRows = rawRows.map((row, rIdx) => {
    return row.map((cell) => {
      if (cell === null || cell === undefined || cell === '') {
        return '';
      }
      if (typeof cell === 'number') {
        // Check if integer looks like an Excel serial date for recent years (e.g., 45000 to 48000 is 2023-2031)
        if (cell >= 44000 && cell <= 50000 && Number.isInteger(cell)) {
          return `${cell} [Data: ${excelDateToString(cell)}]`;
        }
        // Check if fraction represents a time of day
        if (cell > 0 && cell < 1) {
          return `${excelTimeToHHMM(cell)} (${cell.toFixed(4)})`;
        }
        return cell.toString();
      }
      if (cell instanceof Date) {
        return cell.toISOString().split('T')[0];
      }
      return String(cell).replace(/\r\n/g, ' / ').replace(/\n/g, ' / ').trim();
    });
  });

  // Filter out completely empty rows
  const cleanRows = formattedRows.filter((row) => row.some((c) => c !== ''));

  // Build textual tabular representation with column and row coordinates
  const textLines: string[] = [];
  textLines.push(`=== Planilha: "${selectedSheet}" (${cleanRows.length} linhas normalizadas com células mescladas propagadas) ===`);

  cleanRows.forEach((row, r) => {
    const rowValues = row
      .map((val, c) => (val ? `[C${c + 1}]: ${val}` : ''))
      .filter(Boolean)
      .join(' | ');
    if (rowValues) {
      textLines.push(`[Linha ${r + 1}]: ${rowValues}`);
    }
  });

  return {
    selectedSheet,
    textTable: textLines.join('\n'),
    rawMatrix: cleanRows,
  };
}
