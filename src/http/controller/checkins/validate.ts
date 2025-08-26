import { FastifyReply, FastifyRequest } from 'fastify';
import { makeValidateCheckInUseCase } from 'src/use-cases/factories/make-validate-check-in-use-case.js';

import { z } from 'zod';


export async function validate(req: FastifyRequest, res: FastifyReply) {

    const validateCheckInParamsSchema = z.object({
        checkInId: z.string().uuid()
    })


    const { checkInId } = validateCheckInParamsSchema.parse(req.params)

    const validateCheckInUseCase = makeValidateCheckInUseCase()

    await validateCheckInUseCase.execute({
      checkInId
    })

    return res.status(204).send()
}
