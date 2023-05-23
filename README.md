# Shortly: API de Encurtamento de Links

<h2>Sobre:</h2>
<div text-align="center" align="left">
<p>Esse repositório trata-se do código de uma API, cuja finalidade é servir, através de consultas feitas por um ORM num um banco de dados SQL, rotas que encaminhem para criar usuários da aplicação, encurtar novas URLs de um usuário logado, redirecionar para a URL correta através da URL encurtada criada, obter todas as URLs que já foram encurtados pelo usuário, obter um ranking de cliques em URLs, e, também, poder deletar URLs encurtadas. </p>
</div>

<div align="left">
<h2>Rotas:</h2>

<ul align="left">
  <li align="left"><strong>POST</strong> "/users/signup": Enviando um <i>payload</i> contendo <i>email</i> e <i>password</i>, cria um novo usuário.</li>
 <li align="left"><strong>POST</strong> "/auth/sign-in": Enviando um <i>payload</i> contendo <i>name</i>, <i>email</i> e <i>passwod</i>, faz o login de um usuário, obtendo-se uma chave temporária.</li>
 <li align="left"><strong>POST (🔑Rota Autenticada🔑)</strong> "/urls/shorten": Enviando-se uma URL por <i>payload</i>, encurta-se a URL, obtendo-se a url da URL encurtada. </li>
 <li align="left"><strong>GET</strong> "/urls/:id": Enviando-se o id da URL através dos parâmetros da requisição, obtém-se as informações daquela URL encurtada</li>
 <li align="left"><strong>GET (🔑Rota Autenticada🔑)</strong> "/urls/open/:shortUrl": Enviando-se a URL encurtada através dos parâmetros da requisição, redireciona da URL encurtada para a URL original.</li>
 <li align="left"><strong>GET (🔑Rota Autenticada🔑)</strong> "/users/me": Obtém-se todas as URLs encurtadas do usuário e as informações dele </li>
 <li align="left"><strong>GET</strong> "/ranking": Obtém-se um ranking ordenado em ordem decrescente de visitas para as URLs de todos os usuários cadastrados na aplicação.</li>
 <li align="left"><strong>DELETE (🔑Rota Autenticada🔑)</strong> "/urls/:id": Enviando-se o id da URL que se quer excluir, exclui a URL encurtada do usuário.</li>
</ul>
  
  <h3>🤔 Como acesso uma rota autenticada?</h3>
  <p> Possuindo-se a chave temporária, envia-se, através dos <i>headers</i> da requisição, um <i>header</i> de name "Authentication" e key "Bearer + (chave temporária)".</p>

</div>

<div align="left">
<h2>Link para Demo:</h2>
Clique aqui para acessar => <a href="https://uptight-lingerie-ox.cyclic.app" >Shortly API</a>
</div>

<div align="left">
<h2>Como e porquê foi desenvolvido:</h2>
<p>A API foi desenvolvida para praticar meus aprendizados em NestJS e Prisma ORM, atualizando para um framework mais intuitivo, rápido e seguro, um projeto que eu já tinha desenvolvido em Express.js e queries de SQL puras.   </p>
<h4>Stack de Tecnologias Utilizadas:</h4>
  <img alt="nodejs" align="center" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img alt="nestjs" align="center" src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white"/>
  <img alt="prismaorm" align="center" src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/>
  <img alt="postgresql" align="center" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
</div>

## Como executar no Seu Computador
1. Instale as dependências:
```bash
npm i
```
2. Crie um arquivo ".env" conforme o exemplo do arquivo ".env.example"
3. Popule o banco de dados com os modelos:
```bash
npx prisma migrate dev
```
5. Execute-o:
```bash
npm run start:dev
```
6. Ou, opcionalmente, você pode buildá-lo:
```bash
npm run build
```
7. E, então, acesse-o através de http://localhost:3000
