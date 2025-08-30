import { createAGymAndACheckIn } from 'src/utils/test/create-a-gym-and-a-check-in.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '../../../app.js';


describe('Create check-in (e2e)', async () => {

    beforeAll(async () => {
        app.ready()
    })
    afterAll(async () => {
        app.close()
    })


    it('Should be able to create a check-in', async () => {
        const { createdCheckIn } = await createAGymAndACheckIn(app)

        expect(createdCheckIn.statusCode).toBe(201)
    })
})