import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest'
import { app } from '../../app.js';
describe('Authenticate (e2e)', async () => {

    beforeAll(async () => {
        app.ready()
    })
    afterAll(async () => {
        app.close()
    })


    it('Should be able to authenticate', async () => {
        await request(app.server).post('/users').send({
            name: 'Guilherme',
            email: 'guilhermeteste@gmail.com',
            password: '1234567'
        })

        const response = await request(app.server).post('/sessions').send({
            email: 'guilhermeteste@gmail.com',
            password: '1234567'
        })

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })
})