import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest'
import { app } from '../../../app.js';
import { createAndAuthenticateUser } from 'src/utils/test/create-and-authenticate-user.js';


describe('Create gyms (e2e)', async () => {

    beforeAll(async () => {
        app.ready()
    })
    afterAll(async () => {
        app.close()
    })


    it('Should be able to create a gym', async () => {
      const { token } = await createAndAuthenticateUser(app)

        const createdGym = await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
            title: 'JavaScript Gym',
            description: 'Some description',
            phone: '1199999999',
            latitude: -27.2092052,
            longitude: -49.6401091
        })

        expect(createdGym.statusCode).toBe(201)
    })
})