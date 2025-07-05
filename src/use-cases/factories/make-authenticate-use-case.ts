import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository.js';
import { AuthenticateUseCase } from '../authenticate.js';

export function makeAuthenticateUseCase() {

    const usersRepository = new PrismaUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    return sut
}