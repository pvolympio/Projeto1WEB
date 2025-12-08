const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken'); 

const SECRET_KEY = "minha_chave"; 


const usersFilePath = path.join(__dirname, '../../database/users.json');

const getUsers = () => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return []; 
    }
};

const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};


const login = (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();
    
    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Email ou senha inválidos!" });
    }

    // Gerar o Token
    const token = jwt.sign(
        { id: user.id, email: user.email }, // Payload (dados dentro do token)
        SECRET_KEY,                         // Chave secreta
        { expiresIn: '1h' }                 // Expira em 1 hora
    );

    return res.status(200).json({ 
        message: "Login realizado com sucesso!", 
        token, 
        user: { id: user.id, name: user.name, email: user.email }
    });
};


const register = (req, res) => {
    const { name, email, password } = req.body;
    const users = getUsers(); 

    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: "Este e-mail já está em uso!" });
    }
    if(password.length < 7){
        return res.status(400).json({ message: "A senha deve ser maior que 6 caracteres" });
    }
    
    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1, 
        name,    
        email,
        password
    };

    users.push(newUser);
    saveUsers(users); 

    return res.status(201).json({ 
        message: "Usuário criado com sucesso!", 
        user: newUser 
    });
};

module.exports = { login, register };