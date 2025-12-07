import React, { useState } from 'react';
import './styles/Login.css';
import { useNavigate, Link } from 'react-router-dom'; 

function Login() {
  const navigate = useNavigate();
  // Estados para armazenar os dados do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginAction = async (e) => {
    e.preventDefault();

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
        // --- MUDANÇA: Salvar o Token ---
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        console.log("Login sucesso:", data);
        navigate('/dashboard'); 
      } else {
        // Erro: exibe a mensagem retornada pelo backend
        alert(data.message || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar com o servidor.');
    }
  }
  
  return (
    <div className="loginDiv">
      <form className="loginForm" onSubmit={loginAction}> 
        <h2>Entre com sua conta</h2>

        <div className="userInput">
          <input 
            type="email" 
            name='email' 
            id='email' 
            placeholder='Digite seu E-mail' 
            aria-label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            name='password' 
            id='password' 
            placeholder='Digite sua senha' 
            aria-label='Senha' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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