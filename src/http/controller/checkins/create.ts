import { FastifyReply, FastifyRequest } from 'fastify';
import { makeCheckInUseCase } from 'src/use-cases/factories/make-check-in-use-case.js';

import { z } from 'zod';


export async function create(req: FastifyRequest, res: FastifyReply) {

    const createCheckInBodySchema = z.object({
        userLatitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        userLongitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const createCheckInPathParamSchema = z.object({
        gymId: z.string().uuid(),
    })

    const { userLatitude, userLongitude } = createCheckInBodySchema.parse(req.body)
    const { gymId } = createCheckInPathParamSchema.parse(req.params)

    const checkInUseCase = makeCheckInUseCase()

    await checkInUseCase.execute({
        gymId,
        userId: req.user.sub,
        userLatitude,
        userLongitude
    })

    return res.status(201).send()
}
