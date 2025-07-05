import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository.js'
import { GetUserProfileUseCase } from '../get-user-profile.js'

export function makeGetUserProfile() {

    const usersRepository = new PrismaUsersRepository()
    const sut = new GetUserProfileUseCase(usersRepository)
    return sut
}