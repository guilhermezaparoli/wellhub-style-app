import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-reporsitory.js';
import { UserEmailAlreadyExistsError } from '../../use-cases/errors/user-email-already-exists-error.js';
import { RegisterUseCase } from '../../use-cases/register.js';
;
import { z } from 'zod';

export async function register(req: FastifyRequest, res: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, name, password } = registerBodySchema.parse(req.body)

    const userRepository = new PrismaUsersRepository()

    const registerUseCase = new RegisterUseCase(userRepository)
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
