import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository.js';
import { GetUserProfileUseCase } from '../get-user-profile.js';

export function makeGetUserCountCheckInsUseCase() {

    const usersRepository = new PrismaUsersRepository()
    const useCase = new GetUserProfileUseCase(usersRepository)

    return useCase
}