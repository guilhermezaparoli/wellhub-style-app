import { FastifyInstance } from 'fastify';
import { register } from './controller/register.js';
import { authenticate } from './controller/authenticate.js';
import { profile } from './controller/profile.js';
import { verifyJWT } from './middlewares/verify-jwt.js';


export async function AppRoutes(app: FastifyInstance) {

    app.post('/users', register)

    app.post('/sessions', authenticate)

    app.get('/me', { onRequest: [verifyJWT] }, profile)
}