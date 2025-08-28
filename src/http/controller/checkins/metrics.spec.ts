import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest'
import { app } from '../../../app.js';
import { createAndAuthenticateUser } from 'src/utils/test/create-and-authenticate-user.js';
import { createAGymAndACheckIn } from 'src/utils/test/create-a-gym-and-a-check-in.js';


describe('Metrics check-ins (e2e)', async () => {

    beforeAll(async () => {
        app.ready()
    })
    afterAll(async () => {
        app.close()
    })


    it('Should be able to a check-in user metrics', async () => {
        const { token } = await createAndAuthenticateUser(app)

        await createAGymAndACheckIn(app)

        const checkInMetrics = await request(app.server).get('/check-ins/metrics').set('Authorization', `Bearer ${token}`)
        
        expect(checkInMetrics.statusCode).toBe(200)
        expect(checkInMetrics.body.amountCheckIns).toBe(1)
    })
})