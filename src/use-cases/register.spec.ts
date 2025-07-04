import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repositorie.js'
import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register.js'
import { UserEmailAlreadyExistsError } from './errors/user-email-already-exists-error.js'


describe('Register Use Case', () => {
    it('should be able to register', async () => {
        const userRepository = new InMemoryUsersRepository()

        const registerUserCase = new RegisterUseCase(userRepository)

        const body = {
            email: 'guilhermezapas2@gmail.com',
            name: 'teste123',
            password: '123'
        }

        const { user } = await registerUserCase.execute(body)
       
        expect(user.id).toEqual(expect.any(String))

    })
    it('should be a hash user password upon registration', async () => {
        const userRepository = new InMemoryUsersRepository()

        const registerUserCase = new RegisterUseCase(userRepository)

        const body = {
            email: 'guilhermezapas2@gmail.com',
            name: 'teste123',
            password: '123'
        }

        const { user } = await registerUserCase.execute(body)
        const isPasswordCarrectlyHashed = await compare(body.password, user.password_hash)
        expect(isPasswordCarrectlyHashed).toBe(true)

    })
    it('should not be able to register with same email twice', async () => {
        const userRepository = new InMemoryUsersRepository()

        const registerUserCase = new RegisterUseCase(userRepository)

        const body = {
            email: 'guilhermezapas2@gmail.com',
            name: 'teste123',
            password: '123'
        }

        await registerUserCase.execute(body)

        await expect(registerUserCase.execute(body)).rejects.toBeInstanceOf(UserEmailAlreadyExistsError)

    })
})