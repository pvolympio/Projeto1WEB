const jwt = require('jsonwebtoken');
const SECRET_KEY = "minha_chave_secreta_super_segura"; // Tem de ser igual à do controller

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: "Acesso negado! Token não fornecido." });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified; // Guarda os dados do utilizador na requisição
        next(); // Pode passar
    } catch (error) {
        res.status(403).json({ message: "Token inválido!" });
    }
};

module.exports = verifyToken;