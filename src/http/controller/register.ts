import { FastifyReply, FastifyRequest } from 'fastify';

import { z } from 'zod';
import { UserEmailAlreadyExistsError } from '../../use-cases/errors/user-email-already-exists-error.js';
import { MakeRegisterUsecase } from '../../../src/use-cases/factories/make-register-use-case.js';


export async function register(req: FastifyRequest, res: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, name, password } = registerBodySchema.parse(req.body)

   

    const registerUseCase = MakeRegisterUsecase()
    try {
        await registerUseCase.execute({
            email,
            name,
            password
        })

      
    } catch (error) {
        if (error instanceof UserEmailAlreadyExistsError) {
            return res.status(409).send({
                message: error.message
            })
        }

        res.status(500).send()
    }

    return res.status(201).send()
}
