## Semana de Recepção aos Calouros

O site da semana de recepção dos calouros é onde é reunido as principais informações que os calouros irão utilizar dentro do ICMC e da USP São Carlos! Além disso, a página conta com o cronograma utilizado pela semana de recepção do ICMC. A página pode ser vista <a href="https://calouros.icmc.usp.br/">Clicando Aqui</a>.

### Como é Desenvolvido?

O site da semana da recepção utiliza ReactJS como tecnologia principal. Os dados são utilizados do <a href="https://calouros.icmc.usp.br/cms/home">CMS</a>.

### Como Rodar?

Para rodar a aplicação é simples. Após clonar o repositório, utilizar os seguintes comandos para executar

```
npm install
npm start
```

### Principais Alterações

As principais alterações que podem serem feitas são:

- Verificação se os textos continuam corretos;

- Alteração do design da página, cores, slogan, etc;

- Atualização do cronograma da semana de recepção no CMS;

- Adição e remoção de novos conteúdos com base em requisições do ICMC.

### Como Fazer Deploy?

Faça o pull request apontado para a branch dev. Após isso, para atualizar o site, crie um novo pull request da branch dev para main. Após a atualização da main, o site é alterado automaticamente em <a href="https://calouros.icmc.usp.br/">https://calouros.icmc.usp.br/</a>.

O workflow faz o build e reinicia o serviço `calouros`, um servidor Node/Express que entrega o site (`dist/`) e a API (`/api/*`, usada pela home e pelo `/admin`). O nginx só faz proxy para ele.

#### Configuração única na VM

1. Node 20.6+ instalado no sistema (`node -v`); o serviço usa o `node` do PATH.
2. Variáveis do servidor em `/etc/calouros/calouros.env` (legível só pelo usuário `calouros`), com pelo menos `ADMIN_JWT_SECRET` (32+ caracteres), `GOOGLE_CLIENT_ID` e `GEMINI_API_KEY`. O `VITE_GOOGLE_CLIENT_ID` precisa estar no `.env` do repositório na VM, porque entra no build.
3. Serviço: `sudo cp deploy/calouros.service /etc/systemd/system/ && sudo systemctl daemon-reload && sudo systemctl enable --now calouros`.
4. Permitir que o runner reinicie o serviço sem senha (`sudo visudo -f /etc/sudoers.d/calouros`):
   `calouros ALL=(root) NOPASSWD: /usr/bin/systemctl restart calouros, /usr/bin/journalctl -u calouros *`
5. nginx: aplicar `deploy/nginx-calouros.conf` no `server` do site e rodar `sudo nginx -t && sudo systemctl reload nginx`.

Ajuste o usuário `calouros` nos arquivos acima se o runner rodar com outro usuário.

### Algumas Melhorias

- Correção do Pipeline de Dev.
