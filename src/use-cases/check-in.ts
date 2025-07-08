import { CheckIn } from 'generated/prisma/index.js';
import { CheckinsRepository } from 'src/repositories/check-ins-repository.js';
import { GymsRepository } from 'src/repositories/gyms-repository.js';
import { ResourceNotFoundError } from './errors/resource-not-found.js';


interface CheckinUseCaseRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}
interface CheckinUseCaseResponse {
    checkIn: CheckIn
}
export class CheckinUseCase {

    constructor(
        private checkInsRepository: CheckinsRepository,
        private gymsRepository: GymsRepository
    ) { }


    async execute({ userId, gymId }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {

        const gym = await this.gymsRepository.findById(gymId)

        if(!gym){
            throw new ResourceNotFoundError()
        }

        const checkInOnSameDay =  await this.checkInsRepository.findByUserIdOnDate(userId, new Date())
        
        if(checkInOnSameDay){
            throw new Error()
        }
        

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId
        })

        return {
            checkIn
        }
    }
}