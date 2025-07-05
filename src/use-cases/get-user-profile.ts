import { UsersRepository } from 'src/repositories/users-repository.js';
import { ResourceNotFoundError } from './errors/resource-not-found.js';
import { User } from 'generated/prisma/index.js';

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {

    constructor(private usersRepository: UsersRepository){}


    async execute(userId: string): Promise<GetUserProfileUseCaseResponse>{

        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new ResourceNotFoundError()
        }

        return {
            user
        }
    }
}