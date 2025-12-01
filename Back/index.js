const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const playerRoutes = require('./src/routes/playerRoutes'); // <--- Importar rotas de jogadores

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/players', playerRoutes); // <--- Definir a rota base para jogadores

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});