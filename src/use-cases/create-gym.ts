import { Gym } from 'generated/prisma/index.js'
import { GymsRepository } from 'src/repositories/gyms-repository.js'

interface CreateGymUseCaseRequest {
    title: string
    latitude: number
    longitude: number
    phone: string | null
    description: string | null
}

interface CreateGymUseCaseResponse {
    gym: Gym
}
export class CreateGymUseCase {

    constructor(private gymsRepository: GymsRepository) { }


    async execute({ description, latitude, longitude, phone, title }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {

        const gym = await this.gymsRepository.create({ description, latitude, longitude, phone, title })


        return {
            gym
        }
    }
}