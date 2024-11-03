import CreateCompetition from '../../../src/Competition/application/usecase/CreateCompetition';
import CreateCompetitionType from '../../../src/Competition/application/usecase/CreateCompetitionType';
import CompetitionRepositoryDatabase from '../../../src/Competition/infra/repository/CompetitionRepositoryDatabase';
import CompetitionTypeRepositoryDatabase from '../../../src/Competition/infra/repository/CompetitionTypeRepositoryDatabase';
import DatabaseConnection from '../../../src/shared/application/database/DatabaseConnection';
import { PgPromiseAdapter } from '../../../src/shared/infra/database/PgPromiseAdapter';

let connection: DatabaseConnection;
let createCompetitionType: CreateCompetitionType;
let createCompetition: CreateCompetition;

beforeEach(async () => {
    connection = new PgPromiseAdapter();
    await connection.query('DELETE FROM competition', []);
    await connection.query('DELETE FROM competition_type', []);
    const competitionTypeRepository = new CompetitionTypeRepositoryDatabase(connection);
    const competitionRepository = new CompetitionRepositoryDatabase(connection);
    createCompetitionType = new CreateCompetitionType(competitionTypeRepository);
    createCompetition = new CreateCompetition(competitionRepository, competitionTypeRepository);
})

test('Should create a competition type successfully', async function () {
    const inputCreateCompetitionType = { name: 'any competition type' }
    const createCompetitionTypeOutput = await createCompetitionType.execute(inputCreateCompetitionType)
    expect(createCompetitionTypeOutput.competitionTypeId).toBeDefined();
    const inputCreateCompetition = { name: 'any competition', competitionTypeId: createCompetitionTypeOutput.competitionTypeId }
    const outputCreateCompetition = await createCompetition.execute(inputCreateCompetition);
    expect(outputCreateCompetition.competitionId).toBeDefined();
})

test('Should not create a competition type successfully', async function () {
    const inputCreateCompetitionType = { name: 'any competition type' }
    const createCompetitionTypeOutput = await createCompetitionType.execute(inputCreateCompetitionType)
    expect(createCompetitionTypeOutput.competitionTypeId).toBeDefined();
    const invalidCompetitionId = '4eec8554-63a1-4d69-85f9-ed9878ebe303'
    const inputCreateCompetition = { name: 'any competition', competitionTypeId: invalidCompetitionId }
    await expect(createCompetition.execute(inputCreateCompetition)).rejects.toThrow(new Error('Competition type not found'));
})

afterEach(async () => {
    connection.close();
})
