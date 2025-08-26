import { FastifyInstance } from 'fastify'
import request from 'supertest'
export async function createAndAuthenticateUser(app: FastifyInstance) {
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

    return {
        token
    }
}