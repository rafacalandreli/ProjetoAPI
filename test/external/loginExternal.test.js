import request from 'supertest';
import { expect } from 'chai'; 
import messages from '../../src/utils/messages.js';
import userRepository from '../../src/repositories/userRepository.js';


describe('API de Autenticação', () => {
    let aplication = 'http://localhost:3000';

    describe('Cenários de Login', () => {
        beforeEach(async () => {
            userRepository.reset(); // Limpa o repositório antes de cada teste de login
            await request(aplication)
                .post('/auth/register')
                .send({
                    username: 'loginuser@example.com',
                    password: 'pass123'
                });
        });

        afterEach(() => {
            userRepository.reset();
        });

        it('deve fazer login de um usuário existente', async () => {
            const res = await request(aplication)
                .post('/auth/login')
                .send({
                    username: 'loginuser@example.com',
                    password: 'pass123'
                });

            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.property('message').equal(messages.auth.loginSuccess);
        });

        it('não deve fazer login com formato de e-mail inválido', async () => {
            const res = await request(aplication)
                .post('/auth/login')
                .send({
                    username: 'invalid-email',
                    password: 'pass123'
                });
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.have.property('message').equal(messages.auth.invalidEmailFormat);
        });

        it('não deve fazer login com senha maior que 8 caracteres', async () => {
            const res = await request(aplication)
                .post('/auth/login')
                .send({
                    username: 'loginuser@example.com',
                    password: 'longpassword'
                });
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.have.property('message').equal(messages.auth.passwordMaxLength);
        });

        it('não deve fazer login com credenciais inválidas', async () => {
            const res = await request(aplication)
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