import express from 'express';
const app = express();

app.use(express.json());

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import authController from './controllers/authController.js';
import userController from './controllers/userController.js';
import transactionController from './controllers/transactionController.js';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Teste de Automação',
            version: '1.0.0',
            description: 'Uma API simples para aprendizado de testes e automação.',
        },
        servers: [
            {
                url: process.env.BASE_URL,
                description: 'Servidor de Desenvolvimento',
            },
        ],
    },
    apis: ['./src/controllers/*.js'], // Caminho para os arquivos de rotas com anotações Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/auth', authController);
app.use('/users', userController);
app.use('/transactions', transactionController);

import errorHandler from './middlewares/errorHandler.js';

app.use(errorHandler);

export default app;