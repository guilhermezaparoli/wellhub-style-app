import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-check-ins-repositorie.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetUserCountCheckInsUseCase } from './get-user-count-check-ins.js';


let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserCountCheckInsUseCase
describe(('Get user count check-ins'), () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserCountCheckInsUseCase(checkInsRepository)
    })

    it('Should be able to get amount of user check-ins', async () => {

        const userId = 'user-01'
        for (let i = 1; i <= 5; i++) {
            await checkInsRepository.create({
                gym_id: `gym_${i}`,
                user_id: userId
            })
        }

        const { amountCheckIns } = await sut.execute({
            userId
        })

        expect(amountCheckIns).toBe(5)
    })
})