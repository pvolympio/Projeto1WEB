import React, { useState } from 'react';
import './styles/CreateUser.css';
import { useNavigate, Link } from 'react-router-dom';

function CreateUser() {
  const navigate = useNavigate();

  // Estados para os inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateUser = async (e) => {
    e.preventDefault();

    // Validação simples de senha no front
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Conta criada com sucesso!');
        navigate('/login'); 
      } else {
        alert(data.message || 'Erro ao criar conta');
      }

    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar com o servidor.');
    }
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          
          <input 
            type="email" 
            name='email' 
            id='email' 
            placeholder='Digite seu E-mail' 
            aria-label='E-mail'
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
          
          <input 
            type="password" 
            name='confirmPassword' 
            id='confirmPassword' 
            placeholder='Confirme sua senha' 
            aria-label='Confirmar senha'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
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