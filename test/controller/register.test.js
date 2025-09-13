import request from 'supertest';
import app from '../../src/app.js';
import { expect } from 'chai'; 
import messages from '../../src/utils/messages.js';
import userRepository from '../../src/repositories/userRepository.js';
import sinon from 'sinon';


// Mock

import authService from '../../src/services/authService.js';

describe('API de Autenticação - Registro', () => {
    const userValid = 'testuser@example.com';
    const passwordValid = 'pass123';
    let authServiceStub;
       
    beforeEach(async () => {
        userRepository.reset();
        authServiceStub = sinon.stub(authService, 'register');
    });

    afterEach(() => {
        authServiceStub.restore();
    });

    describe('Cenários de Registro', () => {
        it('deve registrar um novo usuário', async () => {
            authServiceStub.resolves({ message: messages.auth.registrationSuccess });

            const res = await request(app)
                .post('/auth/register')
                .send({
                    username: userValid,
                    password: passwordValid
                });
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.have.property('message').equal(messages.auth.registrationSuccess);
        });

        it('não deve registrar um usuário com formato de e-mail inválido', async () => {
            const errorInvalidEmail = new Error(messages.auth.invalidEmailFormat);
            errorInvalidEmail.statusCode = 400;
            authServiceStub.throws(errorInvalidEmail); 
            // Este teste não precisa de stub, pois a validação é feita no controlador
            const res = await request(app)
                .post('/auth/register')
                .send({
                    username: 'invalid-email',
                    password: passwordValid
                });
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.have.property('message').equal(messages.auth.invalidEmailFormat);
        });

        it('não deve registrar um usuário com senha maior que 8 caracteres', async () => {
            const errorPasswordMax = new Error(messages.auth.passwordMaxLength);
            errorPasswordMax.statusCode = 400;
            authServiceStub.throws(errorPasswordMax); 
            // Este teste não precisa de stub, pois a validação é feita no controlador
            const res = await request(app)
                .post('/auth/register')
                .send({
                    username: userValid,
                    password: 'longpassword'
                });
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.have.property('message').equal(messages.auth.passwordMaxLength);
        });

        it('não deve registrar um usuário sem email', async () => {
            const errorEmail = new Error(messages.auth.emailRequired);
            errorEmail.statusCode = 400;
            authServiceStub.throws(errorEmail); 
            // Este teste não precisa de stub, pois a validação é feita no controlador
            const res = await request(app)
                .post('/auth/register')
                .send({
                    password: passwordValid
                });
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.have.property('message').equal(messages.auth.emailRequired);
        });

        it('não deve registrar um usuário sem senha', async () => {
            const errorPassword = new Error(messages.auth.passwordRequired);
            errorPassword.statusCode = 400;
            authServiceStub.throws(errorPassword); 

            // Este teste não precisa de stub, pois a validação é feita no controlador
            const res = await request(app)
                .post('/auth/register')
                .send({
                    username: userValid
                });
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.have.property('message').equal(messages.auth.passwordRequired);
        });

        it('não deve registrar um usuário existente', async () => {
            const errorUserExists = new Error(messages.auth.userExists);
            errorUserExists.statusCode = 400;
            authServiceStub.throws(errorUserExists); // Simula que o serviço já encontrou o usuário

            // Tenta registrar o mesmo usuário novamente
            const res = await request(app)
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