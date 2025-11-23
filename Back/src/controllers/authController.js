// src/controllers/authController.js

// banco de dados para testar
const users = [
    { id: 1, name: "Admin", email: "teste@email.com", password: "123" }
];
const login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Email ou senha inválidos!" });
    }

    return res.status(200).json({ 
        message: "Login realizado com sucesso!", 
        user: { id: user.id, name: user.name, email: user.email }
    });
};
const register = (req, res) => {
    const { name, email, password } = req.body;
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: "Este e-mail já está em uso!" });
    }
    const newUser = {
        id: users.length + 1,
        name,    
        email,
        password
    };
    users.push(newUser);

    return res.status(201).json({ 
        message: "Usuário criado com sucesso!", 
        user: newUser 
    });
};


module.exports = { login, register };