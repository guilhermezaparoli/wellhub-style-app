import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest'
import { app } from '../../../app.js';
import { createAndAuthenticateUser } from 'src/utils/test/create-and-authenticate-user.js';
import { createAGymAndACheckIn } from 'src/utils/test/create-a-gym-and-a-check-in.js';


describe('Validate check-in (e2e)', async () => {

    beforeAll(async () => {
        app.ready()
    })
    afterAll(async () => {
        app.close()
    })


    it('Should be able to validate a check-in', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const { createdCheckIn } = await createAGymAndACheckIn(app)

        const { checkIn } = createdCheckIn.body
        const validateCheckIn = await request(app.server).patch(`/check-ins/${checkIn.id}/validate`).set('Authorization', `Bearer ${token}`)
      
        expect(validateCheckIn.statusCode).toBe(204)
    })
})