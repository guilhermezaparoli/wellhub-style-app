import { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetUserProfile } from 'src/use-cases/factories/make-get-user-profile-use-case.js';
import { z } from 'zod';

export async function getUserProfile(req: FastifyRequest, res: FastifyReply) {


    const getUserProfileSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getUserProfileSchema.parse(req.params)


    const getUserProfileUseCase = makeGetUserProfile()
    


    const user = await getUserProfileUseCase.execute(id)

    
    return res.status(200).send(user)
}