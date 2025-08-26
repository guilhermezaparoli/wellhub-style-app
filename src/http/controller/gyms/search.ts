import { FastifyReply, FastifyRequest } from 'fastify';

import { makeSearchGymsUseCase } from 'src/use-cases/factories/make-search-gyms-use-case.js';
import { z } from 'zod';


export async function search(req: FastifyRequest, res: FastifyReply) {

    const searchGymsQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
        query: z.string()
    })

    const { page, query } = searchGymsQuerySchema.parse(req.params)

    const searchGymsUseCase = makeSearchGymsUseCase()

    const { gyms } = await searchGymsUseCase.execute({
        page,
        query
    })

    return res.status(200).send({
        gyms
    })
}
