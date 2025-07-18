import { Gym } from 'generated/prisma/index.js';
import { GymsRepository } from 'src/repositories/gyms-repository.js';

interface SearchGymsUseCaseRequest {
    query: string
    page: number
}
interface SearchGymsUseCaseResponse {
    gyms: Gym[]
}

export class SearchGymsUseCase {

    constructor(private gymsRepository: GymsRepository) {

    }



    async execute({ query, page }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {

        const gyms = await this.gymsRepository.searchMany(query, page)

        return {
            gyms
        }
    }
}