import { ExpressAdapter } from './shared/infra/http/ExpressAdapter';
import AthleteController from './Athlete/infra/controller/AthleteController';
import RegisterAthlete from './Athlete/application/usecase/RegisterAthlete';
import { PgPromiseAdapter } from './shared/infra/database/PgPromiseAdapter';
import CompetitionTypeController from './Competition/infra/controller/CompetitionTypeController';
import CreateCompetitionType from './Competition/application/usecase/CreateCompetitionType';
import CompetitionRepositoryTypeDatabase from './Competition/infra/repository/database/CompetitionTypeRepositoryDatabase';
import CompetitionController from './Competition/infra/controller/CompetitionController';
import CreateCompetition from './Competition/application/usecase/CreateCompetition';
import CompetitionRepositoryDatabase from './Competition/infra/repository/database/CompetitionRepositoryDatabase';
import GetCompetitionById from './Competition/application/usecase/GetCompetitionById';
import FinishCompetition from './Competition/application/usecase/FinishCompetition';
import AthleteRepositoryDatabase from './Athlete/infra/repository/database/AthleteRepositoryDatabase';
import AttemptController from './Competition/infra/controller/AttemptController';
import CreateAttempt from './Competition/application/usecase/CreateAttempt';
import AttemptRepositoryDatabase from './Competition/infra/repository/database/AttemptRepository';
import { HyperExpressAdapter } from './shared/infra/http/HyperExpressAdapter';
import { FastifyAdapter } from './shared/infra/http/FastifyAdapter';
import GetRanking from './Competition/application/usecase/GetRanking';

const httpServer = new ExpressAdapter();
// const httpServer = new HyperExpressAdapter();
// const httpServer = new FastifyAdapter();
httpServer.register('get', '/health', async () => {
    return { status: 'UP' }
})
const connection = new PgPromiseAdapter(5432);
const athleteRepository = new AthleteRepositoryDatabase(connection);
const registerAthlete = new RegisterAthlete(athleteRepository)
new AthleteController(httpServer, registerAthlete);
const competitionTypeRepository = new CompetitionRepositoryTypeDatabase(connection);
const createCompetitionType = new CreateCompetitionType(competitionTypeRepository);
new CompetitionTypeController(httpServer, createCompetitionType);
const competitionRepository = new CompetitionRepositoryDatabase(connection);
const createCompetition = new CreateCompetition(competitionRepository, competitionTypeRepository);
const getCompetitionById = new GetCompetitionById(competitionRepository);
const finishCompetition = new FinishCompetition(competitionRepository);
new CompetitionController(httpServer, createCompetition, getCompetitionById, finishCompetition);
const attemptRepository = new AttemptRepositoryDatabase(connection);
const createAttempt = new CreateAttempt(attemptRepository, competitionRepository, athleteRepository, competitionTypeRepository);
const getRanking = new GetRanking(attemptRepository, competitionRepository, competitionTypeRepository);
new AttemptController(httpServer, createAttempt, getRanking);
httpServer.listen(5000);
