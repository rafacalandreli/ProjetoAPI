import request from 'supertest';
import app from '../src/app.js'; 
import { expect } from 'chai'; 
import messages from '../src/utils/messages.js';

import userRepository from '../src/repositories/userRepository.js';
import transactionRepository from '../src/repositories/transactionRepository.js';

describe('API de Autenticação', () => {
    beforeEach(async () => {
        userRepository.reset();
        transactionRepository.reset();
    });

    describe('Cenários de Login', () => {
        beforeEach(async () => {
            await request(app)
                .post('/auth/register')
                .send({
                    username: 'loginuser@example.com',
                    password: 'pass123'
                });
        });

        it('deve fazer login de um usuário existente', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    username: 'loginuser@example.com',
                    password: 'pass123'
                });
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.property('message').equal(messages.auth.loginSuccess);
            expect(res.body.user).to.have.property('username').equal('loginuser@example.com');
        });

        it('não deve fazer login com formato de e-mail inválido', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    username: 'invalid-email',
                    password: 'pass123'
                });
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.have.property('message').equal(messages.auth.invalidEmailFormat);
        });

        it('não deve fazer login com senha maior que 8 caracteres', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    username: 'loginuser@example.com',
                    password: 'longpassword'
                });
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.have.property('message').equal(messages.auth.passwordMaxLength);
        });

        it('não deve fazer login com credenciais inválidas', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    username: 'nonexistent@example.com',
                    password: 'pass123'
                });
            expect(res.statusCode).to.equal(401);
            expect(res.body).to.have.property('message').equal(messages.auth.invalidCredentials);
        });
    });
});