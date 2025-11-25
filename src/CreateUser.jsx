import './styles/CreateUser.css';
import { useNavigate, Link } from 'react-router-dom';

function CreateUser() {
  const navigate = useNavigate();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Conta criada com sucesso!');
    navigate('/login'); 
  }

  return (

    <div className="createUserContainer">

      <form className="createUserForm" onSubmit={handleCreateUser}>

        <h2>Criar Nova Conta</h2>
        
        <div className="userInput">
          <input 
            type="text" 
            name='name' 
            id='name' 
            placeholder='Nome completo' 
            aria-label='Nome completo'
          />
          
          <input 
            type="email" 
            name='email' 
            id='email' 
            placeholder='Digite seu E-mail' 
            aria-label='E-mail'
          />
          
          <input 
            type="password" 
            name='password' 
            id='password' 
            placeholder='Digite sua senha' 
            aria-label='Senha'
          />
          
          <input 
            type="password" 
            name='confirmPassword' 
            id='confirmPassword' 
            placeholder='Confirme sua senha' 
            aria-label='Confirmar senha'
          />
        </div>

        <button type="submit" className="btnCriarConta">Criar Conta</button>

        <div className='link-login'>
          <p>Já possui conta? <Link to="/login" className="redirecionaLogin">Faça login aqui</Link></p>
        </div>
      </form>
    </div>
  )
}

export default CreateUser;