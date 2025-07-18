import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repostorie.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms.js';



let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase
describe(('Fetch Nearby Gyms Use Case'), () => {

    beforeEach(() => { 
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymsRepository)
    })

    it('Should be able to fetch nearby gyms', async () => {

        await gymsRepository.create({
            title: 'Near gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        })

        await gymsRepository.create({
            title: 'Far Gym',
            description: null,
            phone: null,
            latitude: -27.0610928,
            longitude: -49.5229501
        })


        const { gyms } = await sut.execute({
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })

        expect(gyms).toHaveLength(1)

        expect(gyms).toEqual(([
            expect.objectContaining({
                title: 'Near gym'
            })
        ]))
    })

})