import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repositorie.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from './errors/resource-not-found.js';
import { GetUserProfileUseCase } from './get-user-profile.js';


let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase
describe(('Get user profile use case'), () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })


    it('should be able to get user profile', async () => {

        const createdUser = await usersRepository.create({
            email: 'guilhermezapas@gmail.com',
            name: 'Guilherme',
            password_hash: await hash('123456', 6)
        })


        const { user } = await sut.execute(createdUser.id)

        expect(user.id).toEqual(createdUser.id)
    })

    it('should not be able to get user profile with wrong id', async () => {

        await expect(sut.execute('non-existing-id')).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
