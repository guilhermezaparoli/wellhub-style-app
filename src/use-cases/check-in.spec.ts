import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckinUseCase } from './check-in.js'
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-check-ins-repositorie.js'
import { randomUUID } from 'node:crypto'


let checkinsRepository: InMemoryCheckInsRepository
let sut: CheckinUseCase

describe('Checkins use case', () => {

    beforeEach(() => {
        checkinsRepository = new InMemoryCheckInsRepository()
        sut = new CheckinUseCase(checkinsRepository)

        vi.useFakeTimers()
    })


    afterEach(() => {
        vi.useRealTimers()
    })
    it('should be able to check in', async () => {


        const { checkIn } = await sut.execute({
            gymId: randomUUID(),
            userId: randomUUID()
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })


    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 0, 0, 0))


        await sut.execute({
            gymId: randomUUID(),
            userId: randomUUID()
        })

        await expect(() => sut.execute({
            gymId: randomUUID(),
            userId: randomUUID()
        })).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 8, 0, 0))


        await sut.execute({
            gymId: randomUUID(),
            userId: randomUUID()
        })

        vi.setSystemTime(new Date(2022, 0, 2, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: randomUUID(),
            userId: randomUUID()
        })
         
        expect(checkIn.id).toEqual(expect.any(String))
    })
})