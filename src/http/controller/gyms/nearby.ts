import { FastifyReply, FastifyRequest } from 'fastify';

import { makeFetchNearbyGymsUseCase } from 'src/use-cases/factories/make-fetch-nearby-gyms-use-case.js';
import { z } from 'zod';


export async function nearby(req: FastifyRequest, res: FastifyReply) {

    const nearbyGymsQuerySchema = z.object({
        userLatitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        userLongitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { userLatitude, userLongitude } = nearbyGymsQuerySchema.parse(req.query)

    const createGymUseCase = makeFetchNearbyGymsUseCase()

    const { gyms } = await createGymUseCase.execute({
        userLatitude,
        userLongitude
    })

    return res.status(200).send({
        gyms
    })
}
