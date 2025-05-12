const request = require('supertest');
const express = require('express');
const userRoutes = require('../../routes/users');
const userCtrl = require('../../src/users');

// Mock de res et req pour les tests unitaires purs
describe('User Controller', () => {
    describe('create', () => {
        test('should create a user and return status 200', () => {
            // Création des mocks
            const req = {
                body: {
                    nom: 'user123',
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: 'password123'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            const next = jest.fn();

            // Appel de la fonction à tester
            userCtrl.create(req, res, next);

            // Vérifications
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith('user created');
        });
    });
});

// Test d'intégration avec l'API
describe('User API', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use(userRoutes);
    });

    test('POST /api/create/user should create a new user', async () => {
        const userData = {
            nom: 'user123',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123'
        };

        const response = await request(app)
            .post('/api/create/user')
            .send(userData)
            .expect('Content-Type', /text/)
            .expect(200);

        expect(response.text).toEqual('user created');
    });
});