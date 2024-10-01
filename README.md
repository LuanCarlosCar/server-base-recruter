baseRecruiter API & Database
Este projeto é a API e o banco de dados do baseRecruiter, uma aplicação voltada para o gerenciamento de recrutamento e seleção. A API foi desenvolvida utilizando o framework Fastify para Node.js, e o banco de dados utilizado é o PostgreSQL, tudo sendo executado em contêineres Docker para facilitar a configuração do ambiente de desenvolvimento.

Tecnologias
API: Fastify (Node.js)
Banco de dados: PostgreSQL (Imagem Docker: bitnami/postgresql:14.13.0)
Pré-requisitos
Antes de começar, certifique-se de ter o Docker instalado na sua máquina. Você pode baixar o Docker aqui.

Configuração do ambiente
Clone o repositório do projeto:

git clone https://github.com/seu-usuario/baseRecruiter.git
Entre no diretório do projeto:

cd baseRecruiter
Verifique se o arquivo docker-compose.yml está configurado corretamente para o seu ambiente de desenvolvimento.

Comandos para rodar o projeto
1. Subir os serviços (API e banco de dados)
Para rodar o projeto e iniciar a API Fastify e o banco de dados PostgreSQL, execute o comando:

docker-compose up -d
Isso iniciará todos os serviços definidos no arquivo docker-compose.yml em segundo plano.

2. Verificar se os contêineres estão rodando
Após iniciar o Docker, verifique o status dos contêineres com o comando:

docker ps
Esse comando listará todos os contêineres ativos e as portas que eles estão utilizando. Verifique se o contêiner da API Fastify e o do PostgreSQL estão listados.

Acessando a API Fastify
URL da API: http://localhost:3000 (assumindo que a porta 3000 foi configurada no arquivo Fastify e Docker Compose)
Você pode testar os endpoints da API usando ferramentas como Postman, Insomnia, ou diretamente no navegador.

Acessando o banco de dados
Porta: 5432 (mapeada para a máquina host)
Usuário do banco: luan
Senha do banco: luan
Nome do banco: inorbit
Use ferramentas como pgAdmin ou DBeaver para acessar o banco de dados PostgreSQL.

Encerrando os serviços
Quando terminar, você pode parar e remover os contêineres com o comando:

docker-compose down
Isso encerrará todos os serviços e removerá os contêineres.


Rodar migrações pelo drizzle
npx drizzle-kit generate