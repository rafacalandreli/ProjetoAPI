import userService from '../services/userService.js';
import express from 'express';
const router = express.Router();
import messages from '../utils/messages.js';

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna a lista de todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: 'Lista de usuários'
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   isFavorite:
 *                     type: boolean
 *       500:
 *         description: 'Erro interno do servidor'
 */
router.get('/', (req, res, next) => {
    try {
        const users = userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error); // Passa o erro para o próximo middleware (errorHandler)
    }
});

export default router;