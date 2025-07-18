import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-check-ins-repositorie.js'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ValidateCheckinUseCase } from './validate-check-in.js'
import { ResourceNotFoundError } from './errors/resource-not-found.js'


let checkinsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckinUseCase

describe('Validate Checkin use case', () => {

    beforeEach(async () => {
        checkinsRepository = new InMemoryCheckInsRepository()
        sut = new ValidateCheckinUseCase(checkinsRepository)


        // vi.useFakeTimers()
    })


    afterEach(() => {
        // vi.useRealTimers()
    })

    it('should be able to validate check-in', async () => {

        const createdCheckIn = await checkinsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })



        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkinsRepository.checkIns[0].validated_at).toEqual(expect.any(Date))
    })
    it('should not be able to validate inexistent check-in', async () => {

        await expect(() => sut.execute({
            checkInId: 'inexistent id'
        })).rejects.instanceOf(ResourceNotFoundError)
    })

})