import { FastifyReply, FastifyRequest } from 'fastify';
import { registerUseCase } from 'src/use-cases/register.js';
import { z } from 'zod';

export async function register(req: FastifyRequest, res: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, name, password } = registerBodySchema.parse(req.body)

    try {
        await registerUseCase({
            email,
            name,
            password
        })
    } catch (error) {
        return res.status(409).send(error)
    }

    return res.status(201).send()
}
