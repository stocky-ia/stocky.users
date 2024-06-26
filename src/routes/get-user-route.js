const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const GetUserDataController = require('../controllers/GetUserDataController');

/**
 * @swagger
 * /users/:id:
 *   get:
 *     summary: Retorna os dados de um usuário existente. Precisa de token. 
 *     tags:
 *       - User
 *     requestBody:
 *       description: User ID
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *              id: 
 *                type: string
 *     responses:
 *       '200':
 *         description: Usuário encontrado.
 *       '404':
 *         description: O usuário não foi encontrado.
 */
router.get('/:id', GetUserDataController.get);

module.exports = router;
