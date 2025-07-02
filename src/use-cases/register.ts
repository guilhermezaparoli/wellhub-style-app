
import { hash } from 'bcryptjs'
import { UsersRepository } from 'src/repositories/users-repository.js'
import { UserEmailAlreadyExistsError } from './errors/user-email-already-exists-error.js'
import { User } from 'generated/prisma/index.js'
interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

interface RegisterUserCaseResponse {
    user: User
}

export class RegisterUseCase {

    constructor(private usersRepository: UsersRepository) {

    }

    async execute({ email, name, password }: RegisterUseCaseRequest): Promise<RegisterUserCaseResponse> {

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserEmailAlreadyExistsError()
        }

        const password_hash = await hash(password, 6)


        const user = await this.usersRepository.create({
            email,
            name,
            password_hash
        })
        return {
            user
        }
    }

}

