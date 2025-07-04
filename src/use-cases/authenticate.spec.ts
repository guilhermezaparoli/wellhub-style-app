import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repositorie.js'
import { AuthenticateUseCase } from './authenticate.js'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'


let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })
    it('should be able to authenticate', async () => {

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

        await expect(() => sut.execute({
            email: 'teste@gmail.com',
            password: '123456'
        })).rejects.instanceOf(InvalidCredentialsError)
    })
    it('should not be able to authenticate with wrong password', async () => {

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