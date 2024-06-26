const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/LoginController');
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário e retorna um JWT.
 *     tags:
 *       - User
 *     requestBody:
 *       description: User data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *     responses:
 *       '200':
 *         description: Login autenticado.
 *       '404':
 *         description: O usuário não foi encontrado.
 *       '422':
 *         description: E-mail ou senha incorretos. 
 *       '500':
 *         description: Um erro ocorreu durante a autenticação do usuário. Tente novamente.
 */
router.post('/login', LoginController.login);

module.exports = router;
