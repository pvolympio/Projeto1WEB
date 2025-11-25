import { useNavigate } from 'react-router-dom';
import './styles/Dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate(); 
    const handleLogout = () => {
        navigate('/login');
    }

    return (
        <div className="dashboardContainer">

            <div className="dashboardSaudacao">
                <h1>Bem-vindo ao Dashboard!</h1>
                <button onClick={handleLogout} className="btnLogout">Sair</button>
            </div>

            <div className="areaCadastro">
                <form className="formCadastro">
                    <h2>Cadastre seu jogador</h2>
                    <div className="userInput">
                        <input 
                            type="text" 
                            name='playerName' 
                            id='playerName' 
                            placeholder='Nome do jogador' 
                            aria-label='Nome do jogador'
                        />

                        <input 
                            type="text" 
                            name='playerNationality' 
                            id='playerNationality' 
                            placeholder='Nacionalidade' 
                            aria-label='Nacionalidade'
                        />

                        <input 
                            type="text" 
                            name='playerTeam' 
                            id='playerTeam' 
                            placeholder='Time atual' 
                            aria-label='Time atual'
                        />

                        <input
                            type="url"
                            name='imagePlayerURL'
                            id='imagePlayerURL'
                            placeholder='URL da imagem do jogador'
                            aria-label='URL da imagem do jogador'
                        />

                        <select 
                            name="playerPosition" 
                            id="playerPosition" 
                            aria-label="Posição do jogador"
                        >
                            <option value="" disabled selected>Posição do jogador</option>
                            <option value="goleiro">Goleiro (GK)</option>
                            <option value="zagueiro">Zagueiro (CB)</option>
                            <option value="lateralEsquerdo">Lateral Esquerdo (LB)</option>
                            <option value="lateralDireiro">Lateral Direito (RB)</option>
                            <option value="volante">Volante (CDM)</option>
                            <option value="meiaCentral">Meia Central (CM)</option>
                            <option value="meiaAtacante">Meia Atacante (CAM)</option>
                            <option value="meiaEsquerda">Meia Esquerda (LM) </option>
                            <option value="meiaDireita">Meia Direita (RM) </option>
                            <option value="pontaEsquerda">Ponta Esquerda (LW)</option>
                            <option value="pontaDireita">Ponta Direita (RW)</option>
                            <option value="atacante">Atacante (ST)</option>
                        </select>
                        
                        <div className="inputAtributosCard">

                            <input 
                                type="number" 
                                name='ritmo'
                                min='0'
                                max='100' 
                                id='ritmo' 
                                placeholder='Ritmo' 
                                aria-label='Ritmo'
                                className="attributeInput"
                            />

                            <input 
                                type="number" 
                                name='chute'
                                min='0'
                                max='100' 
                                id='chute' 
                                placeholder='Chute' 
                                aria-label='Chute'
                                className="attributeInput"
                            />

                            <input 
                                type="number" 
                                name='passe'
                                min='0'
                                max='100' 
                                id='passe' 
                                placeholder='Passe' 
                                aria-label='Passe'
                                className="attributeInput"
                            />

                            <input 
                                type="number" 
                                name='drible'
                                min='0'
                                max='100' 
                                id='drible' 
                                placeholder='Drible' 
                                aria-label='Drible'
                                className="attributeInput"
                            />

                            <input 
                                type="number" 
                                name='defesa'
                                min='0'
                                max='100' 
                                id='defesa' 
                                placeholder='Defesa' 
                                aria-label='Defesa'
                                className="attributeInput"
                            />

                            <input 
                                type="number" 
                                name='fisico'
                                min='0'
                                max='100' 
                                id='fisico' 
                                placeholder='Físico' 
                                aria-label='Físico'
                                className="attributeInput"
                            />

                        </div>

                    </div>


                    <button type="submit" className="btnCadastrarJogador">Cadastrar Jogador</button>

                </form>
                
            </div>

            <div className="listaJogadores">

                <div className="cardJogador">
                    <h3 className="nomeCard">Vampeta</h3>
                    <img className="imgCard" src='https://i.redd.it/u9tw7pgbe27b1.jpg'></img>
                    <p className="nacionalidadeCard">Brasil</p>
                    <p className="timeCard">Corinthians</p>
                    <p className="posicaoCard">Meia Atacante (CAM)</p>
                    <div className="atributosCard">
                        <p>🏃 Ritmo: 85</p>
                        <p>⚽ Chute: 78</p>
                        <p>🎯 Passe: 90</p>
                        <p>🌟 Drible: 88</p>
                        <p>🛡️ Defesa: 60</p>
                        <p>💪 Físico: 80</p>
                        <p>🏆 Overall: 80</p>
                    </div>

                    <div className="btnCard">
                        <button className="btnEditarJogador">✏️ Editar</button>
                        <button className="btnExcluirJogador">❌ Excluir</button>
                    </div>

                </div>
                

                
            </div>
            

        </div>
    )

}