import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const initialFormState = {
        playerName: '',
        playerNationality: '',
        playerTeam: '',
        imagePlayerURL: '',
        playerPosition: '',
        ritmo: '',
        chute: '',
        passe: '',
        drible: '',
        defesa: '',
        fisico: ''
    };

    const [form, setForm] = useState(initialFormState);

    const translatePosition = (apiPosition) => {
        const map = {
            "Goalkeeper": "goleiro",
            "Defender": "zagueiro",
            "Centre Back": "zagueiro",
            "Left Back": "lateralEsquerdo",
            "Right Back": "lateralDireiro",
            "Defensive Midfield": "volante",
            "Midfielder": "meiaCentral",
            "Central Midfield": "meiaCentral",
            "Attacking Midfield": "meiaAtacante",
            "Left Wing": "pontaEsquerda",
            "Right Wing": "pontaDireita",
            "Forward": "atacante",
            "Striker": "atacante",
            "Centre Forward": "atacante"
        };
        return map[apiPosition] || ""; 
    };
    const handleSearchAPI = async () => {
        if (!form.playerName) {
            alert("Digite o nome do jogador para buscar!");
            return;
        }

        try {
            const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${form.playerName}`);
            const data = await response.json();

            if (data.player && data.player.length > 0) {
                setSearchResults(data.player);
                setShowModal(true);
            } else {
                alert("Nenhum jogador encontrado com esse nome. Tente novamente ou preencha manualmente.");
            }
        } catch (error) {
            console.error("Erro ao buscar na API:", error);
            alert("Erro na conexão com a API externa.");
        }
    };

    const selectPlayer = (playerData) => {
        setForm(prev => ({
            ...prev,
            playerName: playerData.strPlayer || prev.playerName,
            playerNationality: playerData.strNationality || prev.playerNationality,
            playerTeam: playerData.strTeam || prev.playerTeam,
            imagePlayerURL: playerData.strCutout || playerData.strThumb || prev.imagePlayerURL,
            playerPosition: translatePosition(playerData.strPosition) || prev.playerPosition
        }));
        
        setShowModal(false);
        setSearchResults([]);
    };

    const fetchPlayers = async () => {
        try {
            const response = await fetch('http://localhost:5000/players');
            const data = await response.json();
            setPlayers(data);
        } catch (error) {
            console.error("Erro ao buscar jogadores:", error);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleEdit = (player) => {
        setEditingId(player.id); 
        setForm({
            playerName: player.playerName,
            playerNationality: player.playerNationality,
            playerTeam: player.playerTeam,
            imagePlayerURL: player.imagePlayerURL,
            playerPosition: player.playerPosition,
            ritmo: player.ritmo,
            chute: player.chute,
            passe: player.passe,
            drible: player.drible,
            defesa: player.defesa,
            fisico: player.fisico
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleCancelEdit = () => {
        setEditingId(null);
        setForm(initialFormState);
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        const url = editingId 
            ? `http://localhost:5000/players/${editingId}` 
            : 'http://localhost:5000/players';
        
        const method = editingId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                alert(editingId ? "Jogador atualizado com sucesso!" : "Jogador cadastrado com sucesso!");
                setForm(initialFormState); 
                setEditingId(null); 
                fetchPlayers(); 
            } else {
                alert("Erro ao salvar jogador.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Tem certeza que deseja excluir este jogador?")) {
            try {
                const response = await fetch(`http://localhost:5000/players/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) fetchPlayers();
            } catch (error) {
                console.error("Erro ao excluir:", error);
            }
        }
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="dashboardContainer">
            <div className="dashboardSaudacao">
                <h1>Bem-vindo ao Dashboard!</h1>
                <button onClick={handleLogout} className="btnLogout">Sair</button>
            </div>
            {showModal && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <h2>Selecione o Jogador</h2>
                        <ul className="resultsList">
                            {searchResults.map((player) => (
                                <li key={player.idPlayer} onClick={() => selectPlayer(player)} className="resultItem">
                                    <img 
                                        src={player.strCutout || player.strThumb || 'https://placehold.co/50'} 
                                        alt={player.strPlayer} 
                                        className="thumbSmall"
                                    />
                                    <div className="playerInfo">
                                        <strong>{player.strPlayer}</strong>
                                        <span>{player.strTeam} ({player.strNationality})</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className="btnCloseModal" onClick={() => setShowModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            <div className="areaCadastro">
                <form className="formCadastro" onSubmit={handleRegister}>
                    <h2>{editingId ? "Editar Jogador" : "Cadastre seu jogador"}</h2>
                    
                    <div className="userInput">
                        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                            <input 
                                type="text" 
                                name='playerName' 
                                placeholder='Nome do jogador (Ex: Ronaldo)' 
                                value={form.playerName} 
                                onChange={handleInputChange} 
                                required 
                                style={{ flex: 1 }} 
                            />
                            <button 
                                type="button" 
                                onClick={handleSearchAPI}
                                className="btnBuscar"
                            >
                                🔍 Buscar
                            </button>
                        </div>

                        <input type="text" name='playerNationality' placeholder='Nacionalidade' 
                            value={form.playerNationality} onChange={handleInputChange} required />

                        <input type="text" name='playerTeam' placeholder='Time atual' 
                            value={form.playerTeam} onChange={handleInputChange} required />

                        <input type="url" name='imagePlayerURL' placeholder='URL da imagem do jogador' 
                            value={form.imagePlayerURL} onChange={handleInputChange} />

                        <select name="playerPosition" value={form.playerPosition} onChange={handleInputChange} required>
                            <option value="" disabled>Posição do jogador</option>
                            <option value="goleiro">Goleiro (GK)</option>
                            <option value="zagueiro">Zagueiro (CB)</option>
                            <option value="lateralEsquerdo">Lateral Esquerdo (LB)</option>
                            <option value="lateralDireiro">Lateral Direito (RB)</option>
                            <option value="volante">Volante (CDM)</option>
                            <option value="meiaCentral">Meia Central (CM)</option>
                            <option value="meiaAtacante">Meia Atacante (CAM)</option>
                            <option value="meiaEsquerda">Meia Esquerda (LM)</option>
                            <option value="meiaDireita">Meia Direita (RM)</option>
                            <option value="pontaEsquerda">Ponta Esquerda (LW)</option>
                            <option value="pontaDireita">Ponta Direita (RW)</option>
                            <option value="atacante">Atacante (ST)</option>
                        </select>
                        
                        <div className="inputAtributosCard">
                            {['ritmo', 'chute', 'passe', 'drible', 'defesa', 'fisico'].map((attr) => (
                                <input 
                                    key={attr}
                                    type="number" 
                                    name={attr}
                                    min='0' max='100' 
                                    placeholder={attr.charAt(0).toUpperCase() + attr.slice(1)} 
                                    className="attributeInput"
                                    value={form[attr]}
                                    onChange={handleInputChange}
                                    required
                                />
                            ))}
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'center' }}>
                        <button type="submit" className="btnCadastrarJogador">
                            {editingId ? "Atualizar Jogador" : "Cadastrar Jogador"}
                        </button>
                        {editingId && (
                            <button 
                                type="button" 
                                className="btnCadastrarJogador" 
                                style={{ backgroundColor: '#dc3545' }} 
                                onClick={handleCancelEdit}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="listaJogadores">
                {players.length === 0 ? (
                    <p style={{color: 'white', textAlign: 'center', width: '100%'}}>Nenhum jogador cadastrado.</p>
                ) : (
                    players.map((player) => (
                        <div className="cardJogador" key={player.id}>
                            <h3 className="nomeCard">{player.playerName}</h3>
                            <img className="imgCard" src={player.imagePlayerURL || 'https://placehold.co/150'} alt={player.playerName} />
                            <p className="nacionalidadeCard">{player.playerNationality}</p>
                            <p className="timeCard">{player.playerTeam}</p>
                            <p className="posicaoCard">{player.playerPosition}</p>
                            <div className="atributosCard">
                                <p>🏃 Ritmo: {player.ritmo}</p>
                                <p>⚽ Chute: {player.chute}</p>
                                <p>🎯 Passe: {player.passe}</p>
                                <p>🌟 Drible: {player.drible}</p>
                                <p>🛡️ Defesa: {player.defesa}</p>
                                <p>💪 Físico: {player.fisico}</p>
                                <p className="overall">🏆 Overall: {player.overall}</p>
                            </div>
                            <div className="btnCard">
                                <button className="btnEditarJogador" onClick={() => handleEdit(player)}>✏️ Editar</button>
                                <button className="btnExcluirJogador" onClick={() => handleDelete(player.id)}>❌ Excluir</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}