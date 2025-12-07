// src/routes/playerRoutes.js
const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');
const verifyToken = require('../middlewares/authMiddleware'); 

// Aplicar o middleware em todas as rotas abaixo
router.use(verifyToken);

// Rotas
router.get('/', playerController.getPlayers);      // Listar
router.post('/', playerController.createPlayer);   // Criar
router.put('/:id', playerController.updatePlayer); // Editar (pelo ID)
router.delete('/:id', playerController.deletePlayer); // Excluir (pelo ID)

module.exports = router;