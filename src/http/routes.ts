import { FastifyInstance } from 'fastify';
import { register } from './controller/register.js';
import { authenticate } from './controller/authenticate.js';
import { getUserProfile } from './controller/getUserProfile.js';

export async function AppRoutes(app: FastifyInstance) {
    
    app.post('/users', register)

    app.post('/sessions', authenticate)

    app.get('/user/:id', getUserProfile)
}