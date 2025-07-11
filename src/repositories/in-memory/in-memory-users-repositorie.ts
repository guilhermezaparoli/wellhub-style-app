import { User, Prisma } from 'generated/prisma/index.js';
import { UsersRepository } from '../users-repository.js';
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements UsersRepository {

    public users: User[] = []


    async create(data: Prisma.UserCreateInput) {

        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }

        this.users.push(user)
        return user
    }

    async findByEmail(email: string) {
        const user = this.users.find((item) => item.email === email)

        if (!user) {
            return null
        }

        return user
    }

    async findById(id: string): Promise<User | null> {

        const user = this.users.find((user) => user.id === id)


        if (!user) {
            return null
        }

        return user
    }

}