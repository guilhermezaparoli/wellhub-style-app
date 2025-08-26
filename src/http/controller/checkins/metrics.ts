import { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetUserCountCheckInsUseCase } from 'src/use-cases/factories/make-get-user-count-check-ins.js';


export async function metrics(req: FastifyRequest, res: FastifyReply) {


    const metricsUseCase = makeGetUserCountCheckInsUseCase()

    const { amountCheckIns } = await metricsUseCase.execute({
        userId: req.user.sub
    })

    return res.status(200).send({
        amountCheckIns
    })
}
