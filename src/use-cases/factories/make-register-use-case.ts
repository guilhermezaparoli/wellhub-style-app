import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository.js';
import { RegisterUseCase } from '../register.js';

export function MakeRegisterUsecase() {
    const usersRepository = new PrismaUsersRepository()
    const sut = new RegisterUseCase(usersRepository)

    return sut
}