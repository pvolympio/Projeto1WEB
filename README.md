-> Desenvolvedores:

Matheus Junqueira Jundurian Bolonha - 2023012436 (Front-End) - Link GitHub: https://github.com/m4theusjjb

Paulo Victor Olympio - 2023007697 (Back-End e integração com a API) - Link GitHub: https://github.com/pvolympio


O Gerenciador de Jogadores (Projeto Web 1) é uma aplicação fullstack para criar e gerenciar cards de jogadores de futebol (estilo FIFA/EAFC). O sistema consome a API TheSportsDB para buscar fotos e dados reais dos jogadores desejados, além de permitir o cadastro manual.

-> Tecnologias Usadas:

Frontend: React + Vite

Backend: Node.js + Express

Estilização: CSS Modules/Puro


-> Funcionalidades:

Autenticação: Sistema simples de Login e Cadastro de usuários.

CRUD de Jogadores: Criar, listar, editar e excluir cartas de jogadores.

Busca Externa: Integração com a API TheSportsDB para preencher dados automaticamente.

Cálculo de Status: O "Overall" do jogador é calculado automaticamente com base na média dos atributos (ritmo, chute, passe, etc).


-> Como rodar o projeto?
O projeto está dividido em duas pastas (Front e Back). Você precisará de dois terminais abertos.

1. Iniciar o Backend e API
Acesse a pasta do backend, instale as dependências e rode o servidor:

Bash:
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

* Observação Importante:
Atualmente o backend não utiliza banco de dados SQL/NoSQL. Os dados (usuários e jogadores) são armazenados em arrays na memória do servidor (arquivos playerController.js e authController.js).
Isso significa que se você reiniciar o backend, os dados cadastrados serão perdidos e voltarão ao estado inicial.

-> Prints da página:

Página inicial (login):
<img width="1920" height="922" alt="image" src="https://github.com/user-attachments/assets/bbc2b7ea-dad4-44ff-b183-6c90ce4f4998" />

Página de cadastro de usuário
<img width="1920" height="925" alt="image" src="https://github.com/user-attachments/assets/04e7cf73-590f-459b-be41-1cb8c0531ad1" />

Página de criação de cards de jogadores:
<img width="1920" height="915" alt="image" src="https://github.com/user-attachments/assets/3574ebfc-2f32-4bb5-9bbd-1449a255d9ed" />

Exemplo do uso da API para buscar jogadores e suas informações pré-definidas:
<img width="1297" height="923" alt="image" src="https://github.com/user-attachments/assets/6c9eacc9-05ae-4032-936b-73338beba3d9" />
<img width="1641" height="808" alt="image" src="https://github.com/user-attachments/assets/26298177-1832-4baf-a7ea-612b439bc552" />
<img width="1233" height="898" alt="image" src="https://github.com/user-attachments/assets/023072d7-6c59-43b9-be3d-cb7b3dd7444e" />

Exemplo da ferramenta de edição de jogadores cadastrados:
<img width="1002" height="913" alt="image" src="https://github.com/user-attachments/assets/d2b6cb67-0b4f-46e7-85cf-07e0b5cdd15a" />
<img width="760" height="723" alt="image" src="https://github.com/user-attachments/assets/6fa86b13-c1c7-45c8-8a24-0650a89bdc3b" />

Exemplo da ferramenta de remoção de jogadores cadastrados:
<img width="1445" height="865" alt="image" src="https://github.com/user-attachments/assets/5b83bcbf-7042-40c6-8c7b-4972fc97b81b" />
<img width="1217" height="790" alt="image" src="https://github.com/user-attachments/assets/7149d838-fd40-47a5-833b-90d137ae1879" />
