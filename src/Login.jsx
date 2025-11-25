import './styles/Login.css';
import { useNavigate, Link } from 'react-router-dom'; 

function Login() {
  const navigate = useNavigate();

  const loginAction = async (e) => {
    e.preventDefault();
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/dashboard'); 
  }
  
  return (

    <div className="loginDiv">

      <form className="loginForm" onSubmit={loginAction}> 

        <h2>Entre com sua conta</h2>

        <div className="userInput">
          <input type="email" name='email' id='email' placeholder='Digite seu E-mail' aria-label='Email'/>
          <input type="password" name='password' id='password' placeholder='Digite sua senha' aria-label='Senha' /> 
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