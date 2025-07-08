import { Decimal } from 'generated/prisma/runtime/library.js'
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-check-ins-repositorie.js'
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repostorie.js'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckinUseCase } from './check-in.js'


let checkinsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckinUseCase

describe('Checkins use case', () => {

    beforeEach(() => {
        checkinsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckinUseCase(checkinsRepository, gymsRepository)



        gymsRepository.gyms.push({
            id: 'gym-01',
            description: 'teste',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
            phone: '',
            title: 'teste'
        })

        vi.useFakeTimers()
    })


    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {



        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052, userLongitude: -49.6401091
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })


    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 0, 0, 0))


        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: -49.6401091
        })

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: -49.6401091
        })).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: -49.6401091
        })

        vi.setSystemTime(new Date(2022, 0, 2, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: -49.6401091
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})