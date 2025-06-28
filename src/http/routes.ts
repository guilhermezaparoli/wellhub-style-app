import { FastifyInstance } from 'fastify';
import { register } from './controller/register.js';

export async function AppRoutes(app: FastifyInstance) {
    
    app.post('/users', register)
}