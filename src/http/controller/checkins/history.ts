import { FastifyReply, FastifyRequest } from 'fastify';
import { makeFetchUserCheckInsHistory } from 'src/use-cases/factories/make-fetch-user-check-ins-history-use-case.js';

import { z } from 'zod';


export async function history(req: FastifyRequest, res: FastifyReply) {

    const historyCheckInsQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    })

    const { page } = historyCheckInsQuerySchema.parse(req.params)

    const searchGymsUseCase = makeFetchUserCheckInsHistory()

    const { checkIns } = await searchGymsUseCase.execute({
        page,
        userId: req.user.sub
    })

    return res.status(200).send({
        checkIns
    })
}
