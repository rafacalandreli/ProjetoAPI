import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app.js';
import messages from '../../src/utils/messages.js';

describe('Transferencia Controller Tests Usando Mocks', () => {
    describe('POST /transfers', () => {
        let aplication = 'http://localhost:3000';

        beforeEach(async () => {
            await request(aplication)
                .post('/auth/register')
                .send({
                    username: 'jose@example.com',
                    password: 'pass123'
                });
            await request(aplication)
                .post('/auth/register')
                .send({
                    username: 'maria@example.com',
                    password: 'pass123'
                });
        });

        it('Não deve ser feito uma transferencia quando informo remetente e destinatario inexistentes', async () => {
            const respose = await request(aplication)
                .post('/transactions/transfer').send({
                senderUsername: "jose2@example.com",
                receiverUsername: "maria@example.com",
                amount: 200
            });
            expect(respose.statusCode).to.equal(400);
            expect(respose.body).to.have.property('message').equal(messages.transaction.senderOrReceiverNotFound);
        });

        it('Deve ser feito uma transferencia quando uso dados validos', async () => {
            const respose = await request(aplication)
                .post('/transactions/transfer').send({
                senderUsername: "jose@example.com",
                receiverUsername: "maria@example.com",
                amount: 200
            });
            expect(respose.statusCode).to.equal(200);
            expect(respose.body).to.have.property('message').equal(messages.transaction.transferSuccess);
        });

        it('Não deve ser feito uma transferencia quando não informo para quem vou fazer a transferencia', async () => {
            const respose = await request(aplication).post('/transactions/transfer').send({
                senderUsername: "jose@example.com",
                receiverUsername: "",
                amount: 200
            });
            expect(respose.statusCode).to.equal(400);
            expect(respose.body).to.have.property('message').equal(messages.transaction.receiverEmailRequired);
        });
    });

    describe('Get /transfers', () => {
    });
});