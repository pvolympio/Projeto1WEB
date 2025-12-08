const fs = require('fs');
const path = require('path');

// Caminho para o banco de jogadores
const playersFilePath = path.join(__dirname, '../../database/players.json');

// Função auxiliar para ler jogadores
const getPlayersData = () => {
    try {
        const data = fs.readFileSync(playersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Função auxiliar para salvar jogadores
const savePlayersData = (players) => {
    fs.writeFileSync(playersFilePath, JSON.stringify(players, null, 2));
};

const getPlayers = (req, res) => {
    const players = getPlayersData();
    return res.status(200).json(players);
};

const createPlayer = (req, res) => {
    const { 
        playerName, playerNationality, playerTeam, imagePlayerURL, playerPosition,
        ritmo, chute, passe, drible, defesa, fisico 
    } = req.body;

    if (!playerName || !playerPosition) {
        return res.status(400).json({ message: "Nome e Posição são obrigatórios!" });
    }

    const stats = [ritmo, chute, passe, drible, defesa, fisico].map(Number);
    const overall = Math.round(stats.reduce((a, b) => a + b, 0) / 6);

    const players = getPlayersData(); 

    const newPlayer = {
        id: players.length > 0 ? players[players.length - 1].id + 1 : 1, 
        playerName,
        playerNationality,
        playerTeam,
        imagePlayerURL,
        playerPosition,
        ritmo: Number(ritmo),
        chute: Number(chute),
        passe: Number(passe),
        drible: Number(drible),
        defesa: Number(defesa),
        fisico: Number(fisico),
        overall
    };

    players.push(newPlayer);
    savePlayersData(players); 

    return res.status(201).json({ 
        message: "Jogador criado com sucesso!", 
        player: newPlayer 
    });
};

const updatePlayer = (req, res) => {
    const { id } = req.params;
    const players = getPlayersData(); 
    const index = players.findIndex(p => p.id == id);

    if (index === -1) {
        return res.status(404).json({ message: "Jogador não encontrado!" });
    }

    const { 
        playerName, playerNationality, playerTeam, imagePlayerURL, playerPosition,
        ritmo, chute, passe, drible, defesa, fisico 
    } = req.body;

    // Recalcular overall se necessário
    let overall = players[index].overall;
    if (ritmo || chute || passe || drible || defesa || fisico) {
         // Usa os novos valores se existirem, ou mantém os antigos
         const p = players[index];
         const r = Number(ritmo) || p.ritmo;
         const c = Number(chute) || p.chute;
         const pa = Number(passe) || p.passe;
         const d = Number(drible) || p.drible;
         const de = Number(defesa) || p.defesa;
         const f = Number(fisico) || p.fisico;
         
         overall = Math.round((r + c + pa + d + de + f) / 6);
    }

    players[index] = {
        ...players[index],
        playerName: playerName || players[index].playerName,
        playerNationality: playerNationality || players[index].playerNationality,
        playerTeam: playerTeam || players[index].playerTeam,
        imagePlayerURL: imagePlayerURL || players[index].imagePlayerURL,
        playerPosition: playerPosition || players[index].playerPosition,
        ritmo: Number(ritmo) || players[index].ritmo,
        chute: Number(chute) || players[index].chute,
        passe: Number(passe) || players[index].passe,
        drible: Number(drible) || players[index].drible,
        defesa: Number(defesa) || players[index].defesa,
        fisico: Number(fisico) || players[index].fisico,
        overall
    };

    savePlayersData(players); 

    return res.status(200).json({ 
        message: "Jogador atualizado!", 
        player: players[index] 
    });
};

const deletePlayer = (req, res) => {
    const { id } = req.params;
    let players = getPlayersData();
    const index = players.findIndex(p => p.id == id);

    if (index === -1) {
        return res.status(404).json({ message: "Jogador não encontrado!" });
    }

    players.splice(index, 1);
    savePlayersData(players); 

    return res.status(200).json({ message: "Jogador excluído com sucesso!" });
};

module.exports = { getPlayers, createPlayer, updatePlayer, deletePlayer };