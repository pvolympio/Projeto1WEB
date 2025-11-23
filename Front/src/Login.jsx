import './styles/Login.css';
import { useNavigate, Link } from 'react-router-dom'; 
import { useState } from 'react'; 

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginAction = async (e) => {
    e.preventDefault();
    setError('');

    try {
      
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login sucesso:", data);
        navigate('/dashboard'); 
      } else {
        setError(data.message);
      }

    } catch (err) {
      setError("Erro ao conectar com o servidor.");
      console.error(err);
    }
  }
  
  return (
    <div className="loginDiv">
      <form className="loginForm" onSubmit={loginAction}> 
        <h2>Entre com sua conta</h2>

        {error && <p style={{color: 'red', fontSize: '14px'}}>{error}</p>}

        <div className="userInput">
          <input 
            type="email" 
            name='email' 
            id='email' 
            placeholder='Digite seu E-mail' 
            aria-label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            name='password' 
            id='password' 
            placeholder='Digite sua senha' 
            aria-label='Senha' 
          
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> 
        </div>

        <button type="submit" className="btnEntrar">Entrar</button>

        <div className='link-cadastrar'>
          <p>Não possui conta? Clique <Link to="/create-user" className='aqui'>aqui</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Login;