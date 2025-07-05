import { beforeEach, describe, expect, it } from 'vitest'
import { CheckinUseCase } from './check-in.js'
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-check-ins-repositorie.js'
import { randomUUID } from 'node:crypto'


let checkinsRepository: InMemoryCheckInsRepository
let sut: CheckinUseCase

describe('Checkins use case', () => {

    beforeEach(() => {
         checkinsRepository = new InMemoryCheckInsRepository()
         sut = new CheckinUseCase(checkinsRepository)
    })
    it('should be able to check in', async () => {


        const { checkIn } = await sut.execute({
            gymId: randomUUID(),
            userId: randomUUID()
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})