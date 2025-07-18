import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repostorie.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { SearchGymsUseCase } from './search-gyms.js';


let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase
describe(('Search Gyms Use Case'), () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(gymsRepository)
    })

    it('Should be able to search gym by title', async () => {

        await gymsRepository.create({
            title: 'JavaScript Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        })

        await gymsRepository.create({
            title: 'Dinossauro Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        })

        const { gyms } = await sut.execute({
            page: 1,
            query: 'Java'
        })

        expect(gyms).toHaveLength(1)

        expect(gyms).toEqual(([
            expect.objectContaining({
                title: 'JavaScript Gym'
            })
        ]))
    })
    it('Should be able to fetch paginated gyms by title', async () => {


        for (let i = 1; i <= 22; i++) {

            await gymsRepository.create({
                title: `JavaScript Gym-${i}`,
                description: null,
                phone: null,
                latitude: -27.2092052,
                longitude: -49.6401091
            })
        }

        const { gyms } = await sut.execute({
            page: 2,
            query: 'JavaScript'
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual(([
            expect.objectContaining({
                title: 'JavaScript Gym-21'
            }),
            
            expect.objectContaining({
                title: 'JavaScript Gym-22'
            })
        ]))
    })
})