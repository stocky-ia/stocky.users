const express = require('express');
const router = express.Router();

const UpdateUserController = require('../controllers/UpdateUserController');

/**
 * @swagger
 * /users/:id:
 *   put:
 *     summary: Atualiza os dados de um usuário. Precisa de token. 
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
 *         description: O usuário foi deletado.
 *       '404':
 *         description: O usuário não foi encontrado.
 *       '500':
 *         description: Não foi possível deletar o usuário.
 */
router.put('/update/:id', UpdateUserController.update)

module.exports = router;
