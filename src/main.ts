import { ExpressAdapter } from './shared/infra/http/ExpressAdapter';

const httpServer = new ExpressAdapter();
httpServer.listen(5000);
