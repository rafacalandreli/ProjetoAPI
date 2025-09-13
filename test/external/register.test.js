import request from 'supertest';
import app from '../../src/app.js';
import { expect } from 'chai'; 
import messages from '../../src/utils/messages.js';
import userRepository from '../../src/repositories/userRepository.js';

describe('API de Autenticação - Registro', () => {
    const userValid = 'testuser@example.com';
    const passwordValid = 'pass123';
    let aplication = 'http://localhost:3000';
       
    beforeEach(async () => {
        userRepository.reset();
    });

    describe('Cenários de Registro', () => {
        it('deve registrar um novo usuário', async () => {
            const randomEmail = `user_${Date.now()}@test.com`;
            const res = await request(aplication)
                .post('/auth/register')
                .send({
                    username: randomEmail,
                    password: passwordValid
                });
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.have.property('message').equal(messages.auth.registrationSuccess);
        });
    });

    describe('Cenários de Registro', () => {
        it('não deve registrar um usuário com formato de e-mail inválido', async () => {
            const res = await request(aplication)
                .post('/auth/register')
                .send({
                    username: 'invalid-email',
                    password: passwordValid
                });
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.have.property('message').equal(messages.auth.invalidEmailFormat);
        });

        it('não deve registrar um usuário com senha maior que 8 caracteres', async () => {
            const res = await request(aplication)
                .post('/auth/register')
                .send({
                    username: userValid,
                    password: 'longpassword'
                });
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.have.property('message').equal(messages.auth.passwordMaxLength);
        });

        it('não deve registrar um usuário sem email', async () => {
            const res = await request(aplication)
                .post('/auth/register')
                .send({
                    password: passwordValid
                });
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.have.property('message').equal(messages.auth.emailRequired);
        });

        it('não deve registrar um usuário sem senha', async () => {
            const res = await request(aplication)
                .post('/auth/register')
                .send({
                    username: userValid
                });
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.have.property('message').equal(messages.auth.passwordRequired);
        });

        it('não deve registrar um usuário existente', async () => {

            await request(aplication)
                .post('/auth/register')
                .send({
                    username: userValid,
                    password: passwordValid
                });

            const res = await request(aplication)
                .post('/auth/register')
                .send({
                    username: userValid,
                    password: passwordValid
                });
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.have.property('message').equal(messages.auth.userExists);
        });
    });
});