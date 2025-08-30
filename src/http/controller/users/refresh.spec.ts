import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest'
import { app } from '../../../app.js';
describe('Refresh token (e2e)', async () => {

    beforeAll(async () => {
        app.ready()
    })
    afterAll(async () => {
        app.close()
    })


    it('Should be able to refresh a token', async () => {
        await request(app.server).post('/users').send({
            name: 'Guilherme',
            email: 'guilhermeteste@gmail.com',
            password: '1234567'
        })

        const authResponse = await request(app.server).post('/sessions').send({
            email: 'guilhermeteste@gmail.com',
            password: '1234567'
        })

        const cookies = authResponse.get('Set-Cookie')
        
        if(cookies){

            const response = await request(app.server).patch('/token/refresh').set('Cookie',  cookies[0]).send()
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                token: expect.any(String)
            })
            
            expect(response.get('Set-Cookie')).toEqual([
                expect.stringContaining('refreshToken=')
            ])
        }
    })
})