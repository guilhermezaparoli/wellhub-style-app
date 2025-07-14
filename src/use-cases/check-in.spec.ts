import { Decimal } from 'generated/prisma/runtime/library.js'
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-check-ins-repositorie.js'
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repostorie.js'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckinUseCase } from './check-in.js'
import { MaxDistanceError } from './errors/max-distance-error.js'


let checkinsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckinUseCase

describe('Checkins use case', () => {

    beforeEach(async () => {
        checkinsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckinUseCase(checkinsRepository, gymsRepository)


        await gymsRepository.create({
            id: 'gym-01',
            title: 'teste',
            description: 'teste',
            latitude: -27.2092052,
            longitude: -49.6401091,
            phone: null,
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
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })


    // it('should not be able to check in twice in the same day', async () => {
    //     vi.setSystemTime(new Date(2022, 0, 1, 0, 0, 0))


    //     await sut.execute({
    //         gymId: 'gym-01',
    //         userId: 'user-01',
    //         userLatitude: 0,
    //         userLongitude: -49.6401091
    //     })

    //     await expect(() => sut.execute({
    //         gymId: 'gym-01',
    //         userId: 'user-01',
    //         userLatitude: 0,
    //         userLongitude: -49.6401091
    //     })).rejects.toBeInstanceOf(MaxNumbersOfCheckInsError)
    // })

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })

        vi.setSystemTime(new Date(2022, 0, 2, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in in a distant gym', async () => {

        gymsRepository.gyms.push({
            id: 'gym-02',
            description: 'teste',
            latitude: new Decimal(-49.6401091),
            longitude: new Decimal(-27.2092052),
            phone: '',
            title: 'teste'
        })

        await expect(() => sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })).rejects.instanceOf(MaxDistanceError)
    })
})