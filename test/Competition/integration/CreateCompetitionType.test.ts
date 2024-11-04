import CreateCompetitionType from '../../../src/Competition/application/usecase/CreateCompetitionType';
import CompetitionTypeRepositoryDatabase from '../../../src/Competition/infra/repository/database/CompetitionTypeRepositoryDatabase';
import CompetitionTypeRepositoryInMemory from '../../../src/Competition/infra/repository/in-memory/CompetitionTypeRepositoryInMemory';
import DatabaseConnection from '../../../src/shared/application/database/DatabaseConnection';
import { PgPromiseAdapter } from '../../../src/shared/infra/database/PgPromiseAdapter';

let connection: DatabaseConnection;
let createCompetitionTypeInMemory: CreateCompetitionType;
let createCompetitionTypeDatabase: CreateCompetitionType;

beforeEach(async () => {
    connection = new PgPromiseAdapter(5433);
    await connection.query('DELETE FROM competition_type', []);
    const competitionTypeRepository = new CompetitionTypeRepositoryInMemory();
    const competitionTypeRepositoryDatabase = new CompetitionTypeRepositoryDatabase(connection);
    createCompetitionTypeInMemory = new CreateCompetitionType(competitionTypeRepository);
    createCompetitionTypeDatabase = new CreateCompetitionType(competitionTypeRepositoryDatabase);
})

test('Should create a competition type successfully', async function () {
    const inputCreateCompetitionTypeOutput = { name: 'any competition type' }
    const createCompetitionTypeOutput = await createCompetitionTypeInMemory.execute(inputCreateCompetitionTypeOutput)
    expect(createCompetitionTypeOutput.competitionTypeId).toBeDefined();
})

test('Should not create a competition type if already exists another competition with same name', async function () {
    const inputCreateCompetitionTypeOutput = { name: 'any competition type' }
    await createCompetitionTypeDatabase.execute(inputCreateCompetitionTypeOutput)
    await expect(createCompetitionTypeDatabase.execute(inputCreateCompetitionTypeOutput)).rejects.toThrow(new Error('Competition Type already exists'));
})

test('Should not create a competition type if already exists another competition with same name', async function () {
    const inputCreateCompetitionTypeOutput = { name: 'any competition type' }
    await createCompetitionTypeInMemory.execute(inputCreateCompetitionTypeOutput)
    await expect(createCompetitionTypeInMemory.execute(inputCreateCompetitionTypeOutput)).rejects.toThrow(new Error('Competition Type already exists'));
})

afterEach(async () => {
    connection.close();
})
