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

### Algumas Melhorias

- Correção do Pipeline de Dev.
