import { Gym } from 'generated/prisma/index.js';
import { GymsRepository } from 'src/repositories/gyms-repository.js';

interface FetchNearbyGymsUseCaseRequest {
    userLatitude: number
    userLongitude: number
}
interface FetchNearbyGymsUseCaseResponse {
    gyms: Gym[]
}

export class FetchNearbyGymsUseCase {

    constructor(private gymsRepository: GymsRepository) {

    }



    async execute({ userLatitude, userLongitude }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {

        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude
        })

        return {
            gyms
        }
    }
}