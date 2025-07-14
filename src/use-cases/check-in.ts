import { CheckIn } from 'generated/prisma/index.js';
import { CheckinsRepository } from 'src/repositories/check-ins-repository.js';
import { GymsRepository } from 'src/repositories/gyms-repository.js';
import { ResourceNotFoundError } from './errors/resource-not-found.js';
import { getDistanceBetweenCoordinates } from 'src/utils/get-distance-between-coordinates.js';
import { MaxDistanceError } from './errors/max-distance-error.js';
import { MaxNumbersOfCheckInsError } from './errors/max-number-of-check-ins-error.js';


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


    async execute({ userId, gymId, userLatitude, userLongitude }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {

        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        const distanceBetweenUserAndGym = getDistanceBetweenCoordinates({
            latitude: userLatitude,
            longitude: userLongitude
        }, {
            latitude: gym.latitude.toNumber(),
            longitude: gym.longitude.toNumber()
        })

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if(distanceBetweenUserAndGym > MAX_DISTANCE_IN_KILOMETERS){
            throw new MaxDistanceError()
        }

        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

        if (checkInOnSameDay) {
            throw new MaxNumbersOfCheckInsError()
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