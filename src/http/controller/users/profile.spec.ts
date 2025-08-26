import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest'
import { app } from '../../../app.js';
import { createAndAuthenticateUser } from 'src/utils/test/create-and-authenticate-user.js';
describe('Profile (e2e)', async () => {

    beforeAll(async () => {
        app.ready()
    })
    afterAll(async () => {
        app.close()
    })


    it('Should be able to get user profile', async () => {
      const { token } = await createAndAuthenticateUser(app)


        const profileResponse = await request(app.server).get('/me').set('Authorization', `Bearer ${token}`)


        expect(profileResponse.statusCode).toBe(200);
        expect(profileResponse.body.user).toEqual(expect.objectContaining({
            email: 'guilhermeteste@gmail.com'
        }))
    })
})