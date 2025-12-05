Gerenciador de Jogadores (Projeto Web 1)
Aplicação fullstack para criar e gerenciar cards de jogadores de futebol (estilo FIFA/EAFC). O sistema consome a API TheSportsDB para buscar fotos e dados reais, além de permitir o cadastro manual.

Tecnologias Usadas
Frontend: React + Vite

Backend: Node.js + Express

Estilização: CSS Modules/Puro

Funcionalidades
Autenticação: Sistema simples de Login e Cadastro de usuários.

CRUD de Jogadores: Criar, listar, editar e excluir cartas de jogadores.

Busca Externa: Integração com a API TheSportsDB para preencher dados automaticamente.

Cálculo de Status: O "Overall" do jogador é calculado automaticamente com base na média dos atributos (ritmo, chute, passe, etc).

Como rodar o projeto
O projeto está dividido em duas pastas (Front e Back). Você precisará de dois terminais abertos.

1. Iniciar o Backend (API)
Acesse a pasta do backend, instale as dependências e rode o servidor:

Bash

cd Back
npm install
npm start
O servidor vai rodar em http://localhost:5000

2. Iniciar o Frontend
Em outro terminal, acesse a pasta do frontend:

Bash

cd Front
npm install
npm run dev
Acesse a aplicação no navegador (geralmente em http://localhost:5173)

Observação Importante
Atualmente o backend não utiliza banco de dados SQL/NoSQL. Os dados (usuários e jogadores) são armazenados em arrays na memória do servidor (arquivos playerController.js e authController.js).

Isso significa que se você reiniciar o backend, os dados cadastrados serão perdidos e voltarão ao estado inicial.
