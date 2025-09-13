import request from 'supertest';
import app from '../../src/app.js'; 
import { expect } from 'chai'; 
import messages from '../../src/utils/messages.js';

import userRepository from '../../src/repositories/userRepository.js';
import sinon from 'sinon';

// Mock

import authService from '../../src/services/authService.js';


describe('API de Autenticação', () => {
    let authServiceStub;

    beforeEach(async () => {
        userRepository.reset();
        // Garante que o stub seja aplicado à instância correta do authService
        // que o app está usando.
        authServiceStub = sinon.stub(authService, 'login');
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

        afterEach(() => {
            authServiceStub.restore();
        });

        it('deve fazer login de um usuário existente', async () => {
            authServiceStub.resolves({ user: { username: 'loginuser@example.com' }, message: messages.auth.loginSuccess });
            const res = await request(app)
                .post('/auth/login')
                .send({
                    username: 'loginuser@example.com',
                    password: 'pass123'
                });

            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.property('message').equal(messages.auth.loginSuccess);
        });

        it('não deve fazer login com formato de e-mail inválido', async () => {
            const errorInvalidEmail = new Error(messages.auth.invalidEmailFormat);
            errorInvalidEmail.statusCode = 400;
            authServiceStub.throws(errorInvalidEmail); 

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
            const error = new Error(messages.auth.passwordMaxLength);
            error.statusCode = 400;
            authServiceStub.throws(error); 

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
            const error = new Error(messages.auth.invalidCredentials);
            error.statusCode = 400;
            authServiceStub.throws(error); 

            const res = await request(app)
                .post('/auth/login')
                .send({
                    username: 'nonexistent@example.com',
                    password: 'pass123'
                });
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.have.property('message').equal(messages.auth.invalidCredentials);
        });
    });
});