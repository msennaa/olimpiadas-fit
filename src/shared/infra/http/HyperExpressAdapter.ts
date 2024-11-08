import HyperExpress from 'hyper-express';
import HttpServer from '../../application/http/HttpServer';

export class HyperExpressAdapter implements HttpServer {
    app: HyperExpress.Server;

    constructor() {
        this.app = new HyperExpress.Server();
    }

    register(method: string, url: string, callback: Function): void {
        (this.app as any)[method](url.replace(/\{|\}/g, ''), async (req: any, res: any) => {
            try {
                const params = req.params;
                const body = await req.json();
                const output = await callback(params, body);
                res.json(output);
            } catch (error: any) {
                res.status(422).json({
                    message: error.message
                });
            }
        });
    }

    listen(port: number): void {
        this.app.listen(port).then(() => {
            console.log(`Server is running on http://localhost:${port}`);
        }).catch((error) => {
            console.error(`Failed to start server: ${error.message}`);
        });
    }
}
