import CreateCompetitionType from '../../../src/Competition/application/usecase/CreateCompetitionType';
import CompetitionTypeRepositoryDatabase from '../../../src/Competition/infra/repository/CompetitionTypeRepositoryDatabase';
import DatabaseConnection from '../../../src/shared/application/database/DatabaseConnection';
import { PgPromiseAdapter } from '../../../src/shared/infra/database/PgPromiseAdapter';

let connection: DatabaseConnection;
let createCompetitionType: CreateCompetitionType;

beforeEach(async () => {
    connection = new PgPromiseAdapter();
    await connection.query('DELETE FROM competition_type', []);
    const competitionTypeRepository = new CompetitionTypeRepositoryDatabase(connection);
    createCompetitionType = new CreateCompetitionType(competitionTypeRepository);
})

test('Should create a competition type successfully', async function () {
    const inputCreateCompetitionTypeOutput = { name: 'any competition type' }
    const createCompetitionTypeOutput = await createCompetitionType.execute(inputCreateCompetitionTypeOutput)
    expect(createCompetitionTypeOutput.competitionTypeId).toBeDefined();
})

test('Should not create a competition type if already exists another competition with same name', async function () {
    const inputCreateCompetitionTypeOutput = { name: 'any competition type' }
    await createCompetitionType.execute(inputCreateCompetitionTypeOutput)
    await expect(createCompetitionType.execute(inputCreateCompetitionTypeOutput)).rejects.toThrow(new Error('Competition Type already exists'));
})

afterEach(() => {
    connection.close();
})
