import { FastifyInstance } from 'fastify'
import { createAndAuthenticateUser } from './create-and-authenticate-user.js'
import request from 'supertest'
export async function createAGymAndACheckIn(app: FastifyInstance) {

    const { token } = await createAndAuthenticateUser(app)

    const createdGym = await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '1199999999',
        latitude: -27.2092052,
        longitude: -49.6401091
    })

    const { gym } = createdGym.body


    const createdCheckIn = await request(app.server).post(`/gyms/${gym.id}/check-ins`).set('Authorization', `Bearer ${token}`).send({
        userLatitude: -27.2092052,
        userLongitude: -49.6401091
    })

    return {
        createdGym,
        createdCheckIn
    }
}