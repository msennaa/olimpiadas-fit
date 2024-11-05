import CreateAttempt from '../../../src/Competition/application/usecase/CreateAttempt';
import CreateCompetition from '../../../src/Competition/application/usecase/CreateCompetition';
import CreateCompetitionType from '../../../src/Competition/application/usecase/CreateCompetitionType';
import RegisterAthlete from '../../../src/Athlete/application/usecase/RegisterAthlete';
import CompetitionRepositoryInMemory from '../../../src/Competition/infra/repository/in-memory/CompetitionRepositoryInMemory';
import CompetitionTypeRepositoryInMemory from '../../../src/Competition/infra/repository/in-memory/CompetitionTypeRepositoryInMemory';
import AttemptInMemoryRepository from '../../../src/Competition/infra/repository/in-memory/AttemptInMemoryRepository';
import AthleteRepositoryMemory from '../../../src/Athlete/infra/repository/in-memory/AthleteRepositoryInMemory';

let createAttempt: CreateAttempt;
let createCompetition: CreateCompetition;
let createCompetitionType: CreateCompetitionType;
let registerAthlete: RegisterAthlete

beforeEach(async () => {
    const attemptRepository = new AttemptInMemoryRepository();
    const competitionRepository = new CompetitionRepositoryInMemory();
    const competitionTypeRepository = new CompetitionTypeRepositoryInMemory();
    const athleteRepository = new AthleteRepositoryMemory();
    createAttempt = new CreateAttempt(attemptRepository, competitionRepository, athleteRepository, competitionTypeRepository);
    createCompetition = new CreateCompetition(competitionRepository, competitionTypeRepository);
    createCompetitionType = new CreateCompetitionType(competitionTypeRepository);
    registerAthlete = new RegisterAthlete(athleteRepository);
})

test('Should create an attempt', async function () {
    const inputCreateCompetitionType = { name: 'hydration' }
    const createCompetitionTypeOutput = await createCompetitionType.execute(inputCreateCompetitionType)
    const inputCreateCompetition = { name: 'any hydration competition', competitionTypeId: createCompetitionTypeOutput.competitionTypeId }
    const createCompetitionOutput = await createCompetition.execute(inputCreateCompetition);
    const inputRegisterAthleteOutput = {
        name: 'any name',
        cpf: '31896670040',
        age: '18'
    }
    const registerAthleteOutput = await registerAthlete.execute(inputRegisterAthleteOutput)
    const inputCreateAttempt = {
        athleteId: registerAthleteOutput.athleteId,
        competitionId: createCompetitionOutput.competitionId,
        unit: 'ml',
        value: 10
    }
    const createAttemptOutput = await createAttempt.execute(inputCreateAttempt);
    expect(createAttemptOutput.attemptId).toBeDefined();
})

test('Should not create an attempt if exceeds the normal limit', async function () {
    const inputCreateCompetitionType = { name: 'hydration' }
    const createCompetitionTypeOutput = await createCompetitionType.execute(inputCreateCompetitionType)
    const inputCreateCompetition = { name: 'any hydration competition', competitionTypeId: createCompetitionTypeOutput.competitionTypeId }
    const createCompetitionOutput = await createCompetition.execute(inputCreateCompetition);
    const inputRegisterAthleteOutput = {
        name: 'any name',
        cpf: '31896670040',
        age: '18'
    }
    const registerAthleteOutput = await registerAthlete.execute(inputRegisterAthleteOutput)
    const inputCreateAttempt = {
        athleteId: registerAthleteOutput.athleteId,
        competitionId: createCompetitionOutput.competitionId,
        unit: 'ml',
        value: 10
    }
    await createAttempt.execute(inputCreateAttempt);
    await expect(createAttempt.execute(inputCreateAttempt)).rejects.toThrow(new Error('Athlete not allowed to attempt'));
})

test('Should not create an attempt if exceeds the dart limit', async function () {
    const inputCreateCompetitionType = { name: 'dart' }
    const createCompetitionTypeOutput = await createCompetitionType.execute(inputCreateCompetitionType)
    const inputCreateCompetition = { name: 'any dart competition', competitionTypeId: createCompetitionTypeOutput.competitionTypeId }
    const createCompetitionOutput = await createCompetition.execute(inputCreateCompetition);
    const inputRegisterAthleteOutput = {
        name: 'any name',
        cpf: '31896670040',
        age: '18'
    }
    const registerAthleteOutput = await registerAthlete.execute(inputRegisterAthleteOutput)
    const inputCreateAttempt = {
        athleteId: registerAthleteOutput.athleteId,
        competitionId: createCompetitionOutput.competitionId,
        unit: 'm',
        value: 100
    }
    await createAttempt.execute(inputCreateAttempt);
    await createAttempt.execute(inputCreateAttempt);
    await createAttempt.execute(inputCreateAttempt);
    await expect(createAttempt.execute(inputCreateAttempt)).rejects.toThrow(new Error('Athlete not allowed to attempt'));
})

test('Should not if competition do not exists create an attempt', async function () {
    const invalidUUID = '2a615a10-86e1-47f4-b07c-871cd48577c5';
    const inputCreateAttempt = {
        athleteId: 'any_athlete_id',
        competitionId: invalidUUID,
        unit: 'ml',
        value: 10
    }
    expect(createAttempt.execute(inputCreateAttempt)).rejects.toThrow(new Error('Competition not found'));
})
