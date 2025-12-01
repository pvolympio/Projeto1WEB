// src/routes/playerRoutes.js
const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

// Rotas
router.get('/', playerController.getPlayers);      // Listar
router.post('/', playerController.createPlayer);   // Criar
router.put('/:id', playerController.updatePlayer); // Editar (pelo ID)
router.delete('/:id', playerController.deletePlayer); // Excluir (pelo ID)

module.exports = router;