import { ExpressAdapter } from './shared/infra/http/ExpressAdapter';

const httpServer = new ExpressAdapter();
httpServer.register('get', '/health', async () => {
    return { status: 'UP' }
})
httpServer.listen(5000);
