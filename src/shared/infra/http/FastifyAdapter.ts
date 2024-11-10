import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import HttpServer from '../../application/http/HttpServer';
import { swaggerDocument } from '../../../../swagger/swagger.config';

export class FastifyAdapter implements HttpServer {
    app: FastifyInstance;

    constructor() {
        this.app = Fastify();
        this.app.register(swagger, {
            swagger: swaggerDocument,
        });
        this.app.register(swaggerUi, {
            routePrefix: '/api-docs',
            uiConfig: {
                docExpansion: 'none',
                deepLinking: false,
            },
        });
    }

    register(method: string, url: string, callback: Function): void {
        (this.app as any)[method](url.replace(/\{|\}/g, ''), async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const { params, body, query } = request;
                const output = await callback(params, body, query);
                reply.send(output);
            } catch (error: any) {
                reply.status(error.status || 500).send({
                    message: error.message || 'Internal server error',
                });
            }
        });
    }

    listen(port: number): void {
        this.app.listen({ port });

    }
}
