import { useNavigate } from 'react-router-dom';
import './styles/Dashboard.css';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]); 
    const handleLogout = () => {
        navigate('/login');
    }

    const [form, setForm] = useState({
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
    });

    const buscarJogadores = async () => {
        try {
            const response = await fetch('http://localhost:5000/players');
            const data = await response.json();
            setPlayers(data);
        } catch (error) {
            console.error("Erro ao buscar jogadores:", error);
        }
    };

    // Carrega os jogadores quando o componente é montado
    useEffect(() => {
        buscarJogadores();
    }, []);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/players', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                alert("Jogador cadastrado com sucesso!");
                setForm({ // Limpa o formulário
                    playerName: '', playerNationality: '', playerTeam: '',
                    imagePlayerURL: '', playerPosition: '',
                    ritmo: '', chute: '', passe: '', drible: '', defesa: '', fisico: ''
                });
                buscarJogadores(); // Atualiza a lista na tela
            } else {
                alert("Erro ao cadastrar jogador.");
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

                if (response.ok) {
                    alert("Jogador excluído!");
                    buscarJogadores(); // Atualiza a lista
                } else {
                    alert("Erro ao excluir.");
                }
            } catch (error) {
                console.error("Erro ao excluir:", error);
            }
        }
    };

    return (
        <div className="dashboardContainer">
            <div className="dashboardSaudacao">
                <h1>Bem-vindo ao Dashboard!</h1>
                <button onClick={handleLogout} className="btnLogout">Sair</button>
            </div>

            <div className="areaCadastro">
                <form className="formCadastro" onSubmit={handleRegister}>
                    <h2>Cadastre seu jogador</h2>
                    <div className="userInput">
                        <input type="text" name='playerName' placeholder='Nome do jogador' 
                            value={form.playerName} onChange={handleInputChange} required />

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
                            <option value="lateralDireito">Lateral Direito (RB)</option>
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
                    <button type="submit" className="btnCadastrarJogador">Cadastrar Jogador</button>
                </form>
            </div>

            <div className="listaJogadores">
                {players.length === 0 ? (
                    <p style={{color: 'white', textAlign: 'center', width: '100%'}}>Nenhum jogador cadastrado.</p>
                ) : (
                    players.map((player) => (
                        <div className="cardJogador" key={player.id}>
                            <h3 className="nomeCard">{player.playerName}</h3>
                            {/* Se não houver imagem, mostra um placeholder */}
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
                                <button className="btnEditarJogador" onClick={() => alert('Função Editar em desenvolvimento!')}>✏️ Editar</button>
                                <button className="btnExcluirJogador" onClick={() => handleDelete(player.id)}>❌ Excluir</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

}