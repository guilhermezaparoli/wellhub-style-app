import { FastifyReply, FastifyRequest } from 'fastify';
import { InvalidCredentialsError } from 'src/use-cases/errors/invalid-credentials-error.js';
import { makeAuthenticateUseCase } from 'src/use-cases/factories/make-authenticate-use-case.js';
import { z } from 'zod';

export async function authenticate(req: FastifyRequest, res: FastifyReply) {

    const authenticateSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateSchema.parse(req.body)


    try {

        const authenticateUseCase = makeAuthenticateUseCase()
        

        const { user } = await authenticateUseCase.execute({
            email, password
        })

        const token = await res.jwtSign({}, {
            sign: {
                sub: user.id
            }
        })

        return res.status(200).send({
            token
        })

    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return res.status(400).send({ message: error.message })
        }
    }




}