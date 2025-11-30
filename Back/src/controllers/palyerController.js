let players = [
    {
        id: 1,
        playerName: "Vampeta",
        playerNationality: "Brasil",
        playerTeam: "Corinthians",
        imagePlayerURL: "https://i.redd.it/u9tw7pgbe27b1.jpg",
        playerPosition: "meiaAtacante",
        ritmo: 85,
        chute: 78,
        passe: 90,
        drible: 88,
        defesa: 60,
        fisico: 80,
        overall: 80
    }
];

const getPlayers = (req,res) => {
    return res.status(200).json(players);
};

const createPlayers = (req,res) => {
    const {
        playerName, playerNationality, playerTeam, imagePlayerURL, playerPosition, ritmo, chute, passe,
        drible, defesa, fisico
    } = req.body;

    if (!playerName || !playerPosition){
        return res.status(400).json({message: "nome e posição são obrigatórios!"});
    }

    const stats = [ritmo, chute, passe, drible, defesa, fisico].map(number);
    const overall = Math.round(stats.reduce((a,b)=> a+b,0)/6);

    const newPlayer = {
        id: players.length + 1, 
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

    return res.status(201).json({
        message : "Player criado com sucesso",
        player: newPlayer
    });

};

const updatePlayer = (req,res) => {
    const {id} = req.params;
    const index = players.findIndex(p => p.id ==id);

    if (index === -1){
        return res.status(404).json({message: "jogador não encontrado"});
    }
    
}