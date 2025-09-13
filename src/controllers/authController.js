import authService from '../services/authService.js';
import express from 'express';
const router = express.Router();
import messages from '../utils/messages.js';
import validationSchemas from '../utils/validationSchemas.js';

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Gerenciamento de autenticação de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: 'Nome de usuário único'
 *               password:
 *                 type: string
 *                 description: 'Senha do usuário'
 *     responses:
 *       201:
 *         description: 'Usuário registrado com sucesso'
 *       400:
 *         description: 'Usuário já existe'
 *       500:
 *         description: 'Erro interno do servidor'
 */
router.post('/register', (req, res, next) => {
    try {
        const { error } = validationSchemas.authSchema.validate(req.body);
        if (error) {
            const validationError = new Error(error.details[0].message);
            validationError.statusCode = 400;
            throw validationError;
        }
        const { username, password } = req.body;
        const result = authService.register(username, password);
        res.status(201).json({ message: messages.auth.registrationSuccess });
    } catch (error) {
        next(error); // Passa o erro para o próximo middleware (errorHandler)
    }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: 'Nome de usuário'
 *               password:
 *                 type: string
 *                 description: 'Senha do usuário'
 *     responses:
 *       200:
 *         description: 'Login bem-sucedido'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     isFavorite:
 *                       type: boolean
 *       401:
 *         description: 'Credenciais inválidas'
 *       500:
 *         description: 'Erro interno do servidor'
 */
router.post('/login', (req, res, next) => {
    try {
        const { error } = validationSchemas.authSchema.validate(req.body);
        if (error) {
            const validationError = new Error(error.details[0].message);
            validationError.statusCode = 400;
            throw validationError;
        }
        const { username, password } = req.body;
        const result = authService.login(username, password);
        res.status(200).json({ message: messages.auth.loginSuccess, user: result.user });
    } catch (error) {
        next(error); // Passa o erro para o próximo middleware (errorHandler)
    }
});

export default router;