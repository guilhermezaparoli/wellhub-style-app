
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repositorie.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history.js';


let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;
describe('Fetch user check-in history use case', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
    })


    it('should be able to feth check-in history', async () => {
        await checkInsRepository.create({
            user_id: 'user-01',
            gym_id: 'gym-01',
        })
        await checkInsRepository.create({
            user_id: 'user-01',
            gym_id: 'gym-02',
        })
        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 1
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-01' }),
            expect.objectContaining({ gym_id: 'gym-02' })
        ])
    })
    it('should be able to feth paginated check-in history', async () => {
         for(let i = 1; i <= 22; i++){
            await checkInsRepository.create({
            user_id: 'user-01',
            gym_id: `gym-${i}`,
        })
        }
        
        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page:  2
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-21' }),
            expect.objectContaining({ gym_id: 'gym-22' })
        ])
    })
})