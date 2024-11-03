import CreateCompetitionType from '../../../src/Competition/application/usecase/CreateCompetitionType';
import CompetitionTypeRepositoryInMemory from '../../../src/Competition/infra/repository/in-memory/CompetitionTypeRepositoryInMemory';

let createCompetitionType: CreateCompetitionType;

beforeEach(async () => {
    const competitionTypeRepository = new CompetitionTypeRepositoryInMemory();
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

