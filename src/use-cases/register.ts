
import { hash } from 'bcryptjs'
import { prisma } from 'src/lib/prisma.js'
import { PrismaUsersRepository } from 'src/repositories/prisma-users-reporsitory.js'

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

export async function registerUseCase({ email, name, password }: RegisterUseCaseRequest) {

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userWithSameEmail) {
        throw new Error('Email already exists!')
    }

    const password_hash = await hash(password, 6)

    const prismaUsersRepository = new PrismaUsersRepository()

    await prismaUsersRepository.create({
        email,
        name,
        password_hash
    })
}