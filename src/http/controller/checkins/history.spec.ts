import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest'
import { app } from '../../../app.js';
import { createAndAuthenticateUser } from 'src/utils/test/create-and-authenticate-user.js';
import { createAGymAndACheckIn } from 'src/utils/test/create-a-gym-and-a-check-in.js';


describe('History check-ins (e2e)', async () => {

    beforeAll(async () => {
        app.ready()
    })
    afterAll(async () => {
        app.close()
    })


    it('Should be able to a check-in history', async () => {
        const { token } = await createAndAuthenticateUser(app)

        await createAGymAndACheckIn(app)

        const checkInsHistory = await request(app.server).get('/check-ins/history').set('Authorization', `Bearer ${token}`).query({
            page: 1
        })
        
        expect(checkInsHistory.statusCode).toBe(200)
        expect(checkInsHistory.body.checkIns).toHaveLength(1)
    })
})