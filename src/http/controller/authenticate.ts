import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-reporsitory.js';
import { AuthenticateUseCase } from 'src/use-cases/authenticate.js';
import { InvalidCredentialsError } from 'src/use-cases/errors/invalid-credentials-error.js';
import { z } from 'zod';

export async function authenticate(req: FastifyRequest, res: FastifyReply) {

    const authenticateSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateSchema.parse(req.body)


    try {
        const usersRepository = new PrismaUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(usersRepository)

        await authenticateUseCase.execute({
            email, password
        })
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return res.status(400).send({ message: error.message })
        }
    }


    return res.status(200).send()

}