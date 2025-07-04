import { describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repositorie.js'
import { AuthenticateUseCase } from './authenticate.js'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'

describe('Authenticate use case', () => {
    it('should be able to authenticate', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            email: 'teste@gmail.com',
            name: 'Guilherme',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'teste@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })
    it('should not be able to authenticate with wrong email', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await expect(() => sut.execute({
            email: 'teste@gmail.com',
            password: '123456'
        })).rejects.instanceOf(InvalidCredentialsError)
    })
    it('should not be able to authenticate with wrong password', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

         await usersRepository.create({
            email: 'teste@gmail.com',
            name: 'Guilherme',
            password_hash: await hash('123456', 6)
        })

         await expect(() => sut.execute({
            email: 'teste@gmail.com',
            password: 'abcdefg'
        })).rejects.instanceOf(InvalidCredentialsError)
    })
})