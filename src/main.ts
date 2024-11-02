import { ExpressAdapter } from './shared/infra/http/ExpressAdapter';
import AthleteController from './Athlete/infra/controller/AthleteController';
import RegisterAthlete from './Athlete/application/usecase/RegisterAthlete';
import AthleteRepositoryDatabase from './Athlete/infra/repository/AthleteRepositoryDatabase';
import { PgPromiseAdapter } from './shared/infra/database/PgPromiseAdapter';

const httpServer = new ExpressAdapter();
httpServer.register('get', '/health', async () => {
    return { status: 'UP' }
})
const connection = new PgPromiseAdapter();
const athleteRepository = new AthleteRepositoryDatabase(connection);
const registerAthlete = new RegisterAthlete(athleteRepository)
new AthleteController(httpServer, registerAthlete);
httpServer.listen(5000);
