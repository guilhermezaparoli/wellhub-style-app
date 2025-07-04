import { FastifyInstance } from 'fastify';
import { register } from './controller/register.js';
import { authenticate } from './controller/authenticate.js';

export async function AppRoutes(app: FastifyInstance) {
    
    app.post('/users', register)

    app.post('/sessions', authenticate)
}