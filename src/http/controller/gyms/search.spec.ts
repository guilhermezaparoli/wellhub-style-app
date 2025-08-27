import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest'
import { app } from '../../../app.js';
import { createAndAuthenticateUser } from 'src/utils/test/create-and-authenticate-user.js';


describe('Search gyms (e2e)', async () => {

    beforeAll(async () => {
        app.ready()
    })
    afterAll(async () => {
        app.close()
    })


    it('Should be able to search a gym', async () => {
      const { token } = await createAndAuthenticateUser(app)

        await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
            title: 'JavaScript Gym',
            description: 'Some description',
            phone: '1199999999',
            latitude: -27.2092052,
            longitude: -49.6401091
        })
        await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
            title: 'TypeScript Gym',
            description: 'Some description',
            phone: '1199999999',
            latitude: -27.2092052,
            longitude: -49.6401091
        })

        const response = await request(app.server).get('/gyms/search').query({
            query: 'JavaScript'
        }).set('Authorization', `Bearer ${token}`)


        expect(response.statusCode).toBe(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'JavaScript Gym'
            })
        ])

        
    })
})