import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest'
import { app } from '../../../app.js';
describe('Profile (e2e)', async () => {

    beforeAll(async () => {
        app.ready()
    })
    afterAll(async () => {
        app.close()
    })


    it('Should be able to get user profile', async () => {
        await request(app.server).post('/users').send({
            name: 'Guilherme',
            email: 'guilhermeteste@gmail.com',
            password: '1234567'
        })

        const authResponse = await request(app.server).post('/sessions').send({
            email: 'guilhermeteste@gmail.com',
            password: '1234567'
        })
        const { token } = authResponse.body


        const profileResponse = await request(app.server).get('/me').set('Authorization', `Bearer ${token}`)


        expect(profileResponse.statusCode).toBe(200);
        expect(profileResponse.body.user).toEqual(expect.objectContaining({
            email: 'guilhermeteste@gmail.com'
        }))
    })
})