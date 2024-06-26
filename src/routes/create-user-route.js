const express = require('express');
const router = express.Router();

const CreateUserController = require('../controllers/CreateUserController');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
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
 *         description: O usuário foi criado.
 *       '409':
 *         description: O e-mail já está em uso.
 *       '422':
 *         description: Impossível cadastrar usuário com nome/e-mail/senha vazio(a). 
 *       '500':
 *         description: Um erro ocorreu durante a criação do usuário. Tente novamente.
 */
router.post('', CreateUserController.create)

module.exports = router;
