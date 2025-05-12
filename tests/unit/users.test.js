const request = require('supertest');
const express = require('express');
const userRoutes = require('../../routes/users');
const userCtrl = require('../../src/users');
const userData = require('../../src/datas');
const bcrypt = require('bcrypt');

// Mock bcrypt pour éviter les opérations de hachage réelles pendant les tests
jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashed_password')
}));

describe('Création d\'un utilisateur', () => {
    // Réinitialiser les mocks et les données avant chaque test
    beforeEach(() => {
        jest.clearAllMocks();
        // Sauvegarde une copie des données originales
        userData.datas = [
            { id: 1, name: "gérard", email: "gerard@example.com", password: "gerardd123" },
            { id: 2, name: "jeanne", email: "jeanne@example.com", password: "jeanne123" },
            { id: 3, name: "loco", email: "loco@example.com", password: "loco123" }
        ];
    });

    test('devrait créer un utilisateur et renvoyer le statut 200', async () => {
        // Création des mocks
        const req = {
            body: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123!'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };

        const next = jest.fn();

        // Appel de la fonction à tester
        await userCtrl.create(req, res, next);

        // Vérifications
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: 'Utilisateur créé avec succès' });
        expect(bcrypt.hash).toHaveBeenCalledWith('password123!', 10);

        // Vérifier que l'utilisateur a été ajouté aux données
        expect(userData.datas.length).toBe(4);
        expect(userData.datas[3].name).toBe('John Doe');
        expect(userData.datas[3].email).toBe('john@example.com');
        expect(userData.datas[3].password).toBe('hashed_password');
    });

    test('devrait renvoyer une erreur 409 si des valeurs sont manquantes', async () => {
        // Cas de test : name manquant
        const reqMissingName = {
            body: {
                email: 'john@example.com',
                password: 'password123!'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };

        await userCtrl.create(reqMissingName, res, jest.fn());
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.send).toHaveBeenCalledWith('Valeurs manquantes');

        // Réinitialiser les mocks
        jest.clearAllMocks();

        // Cas de test : email manquant
        const reqMissingEmail = {
            body: {
                name: 'John Doe',
                password: 'password123!'
            }
        };

        await userCtrl.create(reqMissingEmail, res, jest.fn());
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.send).toHaveBeenCalledWith('Valeurs manquantes');

        // Réinitialiser les mocks
        jest.clearAllMocks();

        // Cas de test : password manquant
        const reqMissingPassword = {
            body: {
                name: 'John Doe',
                email: 'john@example.com'
            }
        };

        await userCtrl.create(reqMissingPassword, res, jest.fn());
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.send).toHaveBeenCalledWith('Valeurs manquantes');
    });

    test('devrait renvoyer une erreur 409 si le mot de passe ne respecte pas les critères', async () => {
        // Mot de passe trop court
        const reqShortPassword = {
            body: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'pwd!'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        await userCtrl.create(reqShortPassword, res, jest.fn());
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.send).toHaveBeenCalledWith('Le mot de passe doit contenir au moins 8 caractères et au moins un caractère spécial');

        // Réinitialiser les mocks
        jest.clearAllMocks();

        // Mot de passe sans caractère spécial
        const reqNoSpecialChar = {
            body: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123'
            }
        };

        await userCtrl.create(reqNoSpecialChar, res, jest.fn());
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.send).toHaveBeenCalledWith('Le mot de passe doit contenir au moins 8 caractères et au moins un caractère spécial');
    });

    test('devrait renvoyer une erreur 409 si l\'email est déjà utilisé', async () => {
        // Email déjà présent dans la base de données
        const req = {
            body: {
                name: 'Gérard Duplicate',
                email: 'gerard@example.com', // Email déjà utilisé
                password: 'password123!'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        await userCtrl.create(req, res, jest.fn());
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.send).toHaveBeenCalledWith('Email déjà utilisé');
    });
});