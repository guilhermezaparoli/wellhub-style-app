import { FastifyReply, FastifyRequest } from 'fastify';

import { makeCreateGymUseCase } from 'src/use-cases/factories/make-create-gym-use-case.js';
import { z } from 'zod';


export async function create(req: FastifyRequest, res: FastifyReply) {

    const createGymBodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { title, description, latitude, longitude, phone } = createGymBodySchema.parse(req.body)

    const createGymUseCase = makeCreateGymUseCase()

    await createGymUseCase.execute({
        description,
        latitude,
        longitude,
        phone,
        title
    })

    return res.status(201).send()
}
