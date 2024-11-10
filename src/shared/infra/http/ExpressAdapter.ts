import HttpServer from '../../application/http/HttpServer';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from '../../../../swagger/swagger.config';

export class ExpressAdapter implements HttpServer {
    app: any

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    register(method: string, url: string, callback: Function): void {
        this.app[method](url.replace(/\{|\}/g, ''), async (req: any, res: any) => {
            try {
                const output = await callback(req.params, req.body, req.query);
                res.json(output);
            } catch (error: any) {
                res.status(422).json({
                    message: error.message
                })
            }
        });
    }

    listen(port: number): void {
        this.app.listen(port);
    }
}
