# Do Auau ao Miau

## Introdução

O projeto se destina a uma ONG de Guarapuava - PR e possui foco em fazer o controle interno dos processos da ONG. Dentre seus processos, o principal é o controle dos termos de compromisso os quais são gerados quando uma adoção é realizada, ou seja, o voluntário da ONG gera este documento a partir do vínculo de um animal com um adotante.

Além disso, o projeto conta com o cadastro de adotantes, usuários do sistema e de animais. Destaque para o cadastro de animais em que é possível ter um controle de todo seu histórico, desde a adoção até a morte, além de ser possível cadastrar todos os procedimentos e gastos envolvidos com o animal.

Por fim, o projeto está todo estruturado em inglês e com os commits seguindo padrões de nomenclatura como ```fix, feat e chore```

## Configurações do Projeto

O projeto foi criado com o backend em <b>NestJS</b> e o frontend em <b>ReactJS</b>. Além disso, o banco de dados é em <b>PostgreSQL</b>.

### Configurações do Frontend
- Possuir <b>Node</b> na versão 20.19.1 ou superior.
- Possuir o <b>NPM</b> (gerenciador de pacotes do Node) na versão 10.8.1 ou superior.
- Clonar o [repositório do Frontend](https://github.com/GuilhermeMooser/AuauAoMiauFront$0).
- Executar o seguinte comando:
<b>```npm install```</b> e após este comando executar <b>```npm run dev```</b>

Após este passo a passo o <b>Frontend</b> estará rodando com sucesso localmente.

### Configurações do Backend
- Possuir <b>Node</b> na versão 20.19.1 ou superior.
- Possuir o <b>NPM</b> (gerenciador de pacotes do Node) na versão 10.8.1 ou superior.
- Possuir o <b>[Docker](https://hub.docker.com/welcome$0)</b> instalado, podendo ser apenas o o <b>DockerHub</b> na versão 29 ou superior.
- Clonar o [repositório do Backend](https://github.com/GuilhermeMooser/AuauAoMiauAPI$0).
- Executar o seguinte comando:
<b>```npm install```</b>

Após este passo a passo o <b>Backend</b> já está apto a rodar com sucesso localmente, porém ainda precisamos configurar o banco de dados.

### Configurações do Banco de dados

Como citado anteriormente, primeiramente precisamos possuir o <b>[Docker](https://hub.docker.com/welcome$0)</b> instalado na máquina. Após realizado o download, seguimos com os passos:
- O projeto possui um arquivo chamado <b>```docker-compose.yml```</b> e nele já temos tudo que precisamos (imagem do banco, container nomeado, volumes e as variáveis de ambiente do projeto)
- Após isso precisamos configurar as variáveis de ambiente do banco de dados:
    - Crie um arquivo chamado ```.env.development```
    - Adicione as variáveis de ambiente local, exemplo:
~~~javascript
DB_USERNAME=postgres
DB_PASSWORD=root
DB_PORT=5432
DB_NAME=postgres
~~~
- Por fim, rode o comando para executar <b>```npm run dev```</b>, agora temos o backend rodando localmente e o banco de dados já está no ar. Além disso, o projeto utiliza migrations, então as tabelas já serão criadas automaticamente após a inicialização do projeto.

## Configurações de Deploy
O projeto conta com esteiras de <b>CI/CD</b> através do <b>Github Actions</b> o que facilita o deploy.

### Deploy do Frontend
- Acessar o arquivo em ```./github/main.yml```
- Alterar o número da versão que consta em 4 lugares
 - O primeiro em ```tags``` e outros 2 dentro de ```cd/steps/with/script```
 - O último fica dentro do ```package.json```no campo de ```version```

 ### Deploy do Backend
- Acessar o arquivo em ```./github/main.yml```
- Alterar o número da versão que consta em 4 lugares
 - O primeiro em ```tags``` e outros 2 dentro de ```cd/steps/with/script```
 - O último fica dentro do ```package.json```no campo de ```version```

## Variáveis de ambiente padrão
~~~javascript
PORT=
NODE_ENV=
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_PORT=
DB_NAME=
DB_LOGS=
DB_SSL_ENABLED=
DB_MAX_CONNECTIONS=
DB_MIN_CONNECTIONS=
DB_CONNECTION_TIMEOUT=
DB_QUERY_TIMEOUT=
DB_SYNCHRONIZE=
ORIGINS=
ALLOWED_METHODS=
DB_MIGRATIONS_RUN=
COOKIE_SECRET=
ENCRYPTION_SALTS=
JWT_EXPIRES_IN=
JWT_SECRET=
COOKIE_SECURE=
COOKIE_SAME_SITE=
COOKIE_DOMAIN=
~~~

## Agradecimentos

A instituição <b>Campo Real</b> - Campus Guarapuava - PR. Ao professores <b>Giovane Galvão</b> e <b>Enrique Augusto da Roza</b> os quais fizeram parte de todo o processo desde a concepção do Software e foram muito importantes para esta entrega. Por fim, os agradecimentos finais são para a Clara que foi quem nos atendeu de prontidão para passar as necessidades do Software e aos desenvolvedores:
 - ### Guilherme Moser Montes
    - [Linkedin](https://www.linkedin.com/in/guilherme-moser-08292528b/$0)
    - [Github](https://github.com/GuilhermeMooser$0)
 - ### Ranilson F. Ribeiro

 ### Contatos:
 - Email
    - engs-ranilsonjunior@camporeal.edu.br
    - engs-guilhermemontes@camporeal.edu.br








