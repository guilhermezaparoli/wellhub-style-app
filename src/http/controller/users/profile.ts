import { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetUserProfile } from 'src/use-cases/factories/make-get-user-profile-use-case.js';

export async function profile(req: FastifyRequest, res: FastifyReply) {


    await req.jwtVerify()


    const getUserProfileUseCase = makeGetUserProfile()



    const { user } = await getUserProfileUseCase.execute(req.user.sub)
    
    return res.status(200).send({
        user: {
            ...user,
            password_hash: undefined
        }
    })
}