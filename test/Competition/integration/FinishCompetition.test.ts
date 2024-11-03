import CreateCompetition from '../../../src/Competition/application/usecase/CreateCompetition';
import CreateCompetitionType from '../../../src/Competition/application/usecase/CreateCompetitionType';
import FinishCompetition from '../../../src/Competition/application/usecase/FinishCompetition';
import GetCompetitionById from '../../../src/Competition/application/usecase/GetCompetitionById';
import CompetitionRepositoryDatabase from '../../../src/Competition/infra/repository/database/CompetitionRepositoryDatabase';
import CompetitionTypeRepositoryDatabase from '../../../src/Competition/infra/repository/database/CompetitionTypeRepositoryDatabase';
import DatabaseConnection from '../../../src/shared/application/database/DatabaseConnection';
import { PgPromiseAdapter } from '../../../src/shared/infra/database/PgPromiseAdapter';

let connection: DatabaseConnection;
let createCompetitionType: CreateCompetitionType;
let createCompetition: CreateCompetition;
let getCompetitionById: GetCompetitionById;
let finishCompetition: FinishCompetition;

beforeEach(async () => {
    connection = new PgPromiseAdapter(5433);
    await connection.query('DELETE FROM competition', []);
    await connection.query('DELETE FROM competition_type', []);
    const competitionTypeRepository = new CompetitionTypeRepositoryDatabase(connection);
    const competitionRepository = new CompetitionRepositoryDatabase(connection);
    createCompetitionType = new CreateCompetitionType(competitionTypeRepository);
    createCompetition = new CreateCompetition(competitionRepository, competitionTypeRepository);
    getCompetitionById = new GetCompetitionById(competitionRepository);
    finishCompetition = new FinishCompetition(competitionRepository);
})

test('Should finish a competition', async function () {
    const inputCreateCompetitionType = { name: 'any competition type' }
    const createCompetitionTypeOutput = await createCompetitionType.execute(inputCreateCompetitionType)
    expect(createCompetitionTypeOutput.competitionTypeId).toBeDefined();
    const inputCreateCompetition = { name: 'any competition', competitionTypeId: createCompetitionTypeOutput.competitionTypeId }
    const outputCreateCompetition = await createCompetition.execute(inputCreateCompetition);
    expect(outputCreateCompetition.competitionId).toBeDefined();
    await finishCompetition.execute(outputCreateCompetition.competitionId);
    const outputGetCompetitionById = await getCompetitionById.execute(outputCreateCompetition.competitionId);
    expect(outputGetCompetitionById.name).toBe(inputCreateCompetition.name);
    expect(outputGetCompetitionById.competitionTypeId).toBe(createCompetitionTypeOutput.competitionTypeId);
    expect(outputGetCompetitionById.status).toBe('finished');
    expect(outputGetCompetitionById.startCompetition).toBeDefined();
    expect(outputGetCompetitionById.endCompetition).toBeDefined();
})

test('Should not finish an competition if already finished', async function () {
    const inputCreateCompetitionType = { name: 'any competition type' }
    const createCompetitionTypeOutput = await createCompetitionType.execute(inputCreateCompetitionType)
    expect(createCompetitionTypeOutput.competitionTypeId).toBeDefined();
    const inputCreateCompetition = { name: 'any competition', competitionTypeId: createCompetitionTypeOutput.competitionTypeId }
    const outputCreateCompetition = await createCompetition.execute(inputCreateCompetition);
    expect(outputCreateCompetition.competitionId).toBeDefined();
    await finishCompetition.execute(outputCreateCompetition.competitionId);
    await expect(finishCompetition.execute(outputCreateCompetition.competitionId)).rejects.toThrow(new Error('Competition is not in progress'));
})

afterEach(async () => {
    await connection.query('DELETE FROM competition', []);
    await connection.query('DELETE FROM competition_type', []);
    connection.close();
})
