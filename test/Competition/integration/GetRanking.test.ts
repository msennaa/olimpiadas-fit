import CreateAttempt from '../../../src/Competition/application/usecase/CreateAttempt';
import CreateCompetition from '../../../src/Competition/application/usecase/CreateCompetition';
import CreateCompetitionType from '../../../src/Competition/application/usecase/CreateCompetitionType';
import RegisterAthlete from '../../../src/Athlete/application/usecase/RegisterAthlete';
import CompetitionRepositoryInMemory from '../../../src/Competition/infra/repository/in-memory/CompetitionRepositoryInMemory';
import CompetitionTypeRepositoryInMemory from '../../../src/Competition/infra/repository/in-memory/CompetitionTypeRepositoryInMemory';
import AttemptInMemoryRepository from '../../../src/Competition/infra/repository/in-memory/AttemptInMemoryRepository';
import AthleteRepositoryMemory from '../../../src/Athlete/infra/repository/in-memory/AthleteRepositoryInMemory';
import GetRanking from '../../../src/Competition/application/usecase/GetRanking';

let createAttempt: CreateAttempt;
let createCompetition: CreateCompetition;
let createCompetitionType: CreateCompetitionType;
let registerAthlete: RegisterAthlete
let getRanking: GetRanking;

beforeEach(async () => {
    const attemptRepository = new AttemptInMemoryRepository();
    const competitionRepository = new CompetitionRepositoryInMemory();
    const competitionTypeRepository = new CompetitionTypeRepositoryInMemory();
    const athleteRepository = new AthleteRepositoryMemory();
    createAttempt = new CreateAttempt(attemptRepository, competitionRepository, athleteRepository, competitionTypeRepository);
    createCompetition = new CreateCompetition(competitionRepository, competitionTypeRepository);
    createCompetitionType = new CreateCompetitionType(competitionTypeRepository);
    registerAthlete = new RegisterAthlete(athleteRepository);
    getRanking = new GetRanking(attemptRepository, competitionRepository, competitionTypeRepository);
})

test('Should test an hydration ranking', async function () {
    const inputCreateCompetitionType = { name: 'hydration' }
    const createCompetitionTypeOutput = await createCompetitionType.execute(inputCreateCompetitionType)
    const inputCreateCompetition = { name: 'any hydration competition', competitionTypeId: createCompetitionTypeOutput.competitionTypeId }
    const createCompetitionOutput = await createCompetition.execute(inputCreateCompetition);
    const inputFirstAthleteOutput = {
        name: 'first athlete',
        cpf: '31896670040',
        age: '18'
    }
    const registerFirstAthleteOutput = await registerAthlete.execute(inputFirstAthleteOutput)
    const inputCreateAttemptFirstAthlete = {
        athleteId: registerFirstAthleteOutput.athleteId,
        competitionId: createCompetitionOutput.competitionId,
        unit: 'ml',
        value: 100
    }
    await createAttempt.execute(inputCreateAttemptFirstAthlete);
    const inputSecondAthleteOutput = {
        name: 'second athlete',
        cpf: '62373753090',
        age: '28'
    }
    const registerSecondAthleteOutput = await registerAthlete.execute(inputSecondAthleteOutput)
    const inputCreateAttemptSecondAthlete = {
        athleteId: registerSecondAthleteOutput.athleteId,
        competitionId: createCompetitionOutput.competitionId,
        unit: 'l',
        value: 10
    }
    await createAttempt.execute(inputCreateAttemptSecondAthlete);
    const inputThirdAthleteOutput = {
        name: 'third athlete',
        cpf: '76533030051',
        age: '41'
    }
    const registerThirdAthleteOutput = await registerAthlete.execute(inputThirdAthleteOutput)
    const inputCreateAttemptThirdAthlete = {
        athleteId: registerThirdAthleteOutput.athleteId,
        competitionId: createCompetitionOutput.competitionId,
        unit: 'ml',
        value: 1000
    }
    const getRankingInput = {
        page: 1,
        limit: 10,
        competitionId: createCompetitionOutput.competitionId,
    }
    await createAttempt.execute(inputCreateAttemptThirdAthlete);
    const getRankingOutput = await getRanking.execute(getRankingInput);
    expect(getRankingOutput).toEqual(expect.arrayContaining([
        expect.objectContaining({ value: 10, unit: 'l', position: 1 }),
        expect.objectContaining({ value: 1000, unit: 'ml', position: 2 }),
        expect.objectContaining({ value: 100, unit: 'ml', position: 3 })
    ]));
})

test('Should test an dart ranking', async function () {
    const inputCreateCompetitionType = { name: 'dart' }
    const createCompetitionTypeOutput = await createCompetitionType.execute(inputCreateCompetitionType)
    const inputCreateCompetition = { name: 'any dart competition', competitionTypeId: createCompetitionTypeOutput.competitionTypeId }
    const createCompetitionOutput = await createCompetition.execute(inputCreateCompetition);
    const inputFirstAthleteOutput = {
        name: 'first athlete',
        cpf: '31896670040',
        age: '18'
    }
    const registerFirstAthleteOutput = await registerAthlete.execute(inputFirstAthleteOutput)
    const inputCreateAttemptFirstAthlete = {
        athleteId: registerFirstAthleteOutput.athleteId,
        competitionId: createCompetitionOutput.competitionId,
        unit: 'cm',
        value: 100
    }
    await createAttempt.execute(inputCreateAttemptFirstAthlete);
    const inputSecondAthleteOutput = {
        name: 'second athlete',
        cpf: '62373753090',
        age: '28'
    }
    const registerSecondAthleteOutput = await registerAthlete.execute(inputSecondAthleteOutput)
    const inputCreateAttemptSecondAthlete = {
        athleteId: registerSecondAthleteOutput.athleteId,
        competitionId: createCompetitionOutput.competitionId,
        unit: 'm',
        value: 9
    }
    await createAttempt.execute(inputCreateAttemptSecondAthlete);
    const inputThirdAthleteOutput = {
        name: 'third athlete',
        cpf: '76533030051',
        age: '41'
    }
    const registerThirdAthleteOutput = await registerAthlete.execute(inputThirdAthleteOutput)
    const inputCreateAttemptThirdAthlete = {
        athleteId: registerThirdAthleteOutput.athleteId,
        competitionId: createCompetitionOutput.competitionId,
        unit: 'cm',
        value: 1000
    }
    const getRankingInput = {
        page: 1,
        limit: 10,
        competitionId: createCompetitionOutput.competitionId,
    }
    await createAttempt.execute(inputCreateAttemptThirdAthlete);
    const getRankingOutput = await getRanking.execute(getRankingInput);
    expect(getRankingOutput).toEqual(expect.arrayContaining([
        expect.objectContaining({ value: 1000, unit: 'cm', position: 1 }),
        expect.objectContaining({ value: 9, unit: 'm', position: 2 }),
        expect.objectContaining({ value: 100, unit: 'cm', position: 3 })
    ]));
})

test('Should test an lose weight ranking', async function () {
    const inputCreateCompetitionType = { name: 'lose weight' }
    const createCompetitionTypeOutput = await createCompetitionType.execute(inputCreateCompetitionType)
    const inputCreateCompetition = { name: 'any lose weight competition', competitionTypeId: createCompetitionTypeOutput.competitionTypeId }
    const createCompetitionOutput = await createCompetition.execute(inputCreateCompetition);
    const inputFirstAthleteOutput = {
        name: 'first athlete',
        cpf: '31896670040',
        age: '18'
    }
    const registerFirstAthleteOutput = await registerAthlete.execute(inputFirstAthleteOutput)
    const inputCreateAttemptFirstAthlete = {
        athleteId: registerFirstAthleteOutput.athleteId,
        competitionId: createCompetitionOutput.competitionId,
        unit: 'kg',
        value: 30
    }
    await createAttempt.execute(inputCreateAttemptFirstAthlete);
    const inputSecondAthleteOutput = {
        name: 'second athlete',
        cpf: '62373753090',
        age: '28'
    }
    const registerSecondAthleteOutput = await registerAthlete.execute(inputSecondAthleteOutput)
    const inputCreateAttemptSecondAthlete = {
        athleteId: registerSecondAthleteOutput.athleteId,
        competitionId: createCompetitionOutput.competitionId,
        unit: 'kg',
        value: 10
    }
    await createAttempt.execute(inputCreateAttemptSecondAthlete);
    const inputThirdAthleteOutput = {
        name: 'third athlete',
        cpf: '76533030051',
        age: '41'
    }
    const registerThirdAthleteOutput = await registerAthlete.execute(inputThirdAthleteOutput)
    const inputCreateAttemptThirdAthlete = {
        athleteId: registerThirdAthleteOutput.athleteId,
        competitionId: createCompetitionOutput.competitionId,
        unit: 'mg',
        value: 5000
    }
    const getRankingInput = {
        page: 1,
        limit: 10,
        competitionId: createCompetitionOutput.competitionId,
    }
    await createAttempt.execute(inputCreateAttemptThirdAthlete);
    const getRankingOutput = await getRanking.execute(getRankingInput);
    expect(getRankingOutput).toEqual(expect.arrayContaining([
        expect.objectContaining({ value: 30, unit: 'kg', position: 1 }),
        expect.objectContaining({ value: 10, unit: 'kg', position: 2 }),
        expect.objectContaining({ value: 5000, unit: 'mg', position: 3 })
    ]));
})

test('Should test an meditation ranking', async function () {
    const inputCreateCompetitionType = { name: 'meditation' }
    const createCompetitionTypeOutput = await createCompetitionType.execute(inputCreateCompetitionType)
    const inputCreateCompetition = { name: 'any meditation competition', competitionTypeId: createCompetitionTypeOutput.competitionTypeId }
    const createCompetitionOutput = await createCompetition.execute(inputCreateCompetition);
    const inputFirstAthleteOutput = {
        name: 'first athlete',
        cpf: '31896670040',
        age: '18'
    }
    const registerFirstAthleteOutput = await registerAthlete.execute(inputFirstAthleteOutput)
    const inputCreateAttemptFirstAthlete = {
        athleteId: registerFirstAthleteOutput.athleteId,
        competitionId: createCompetitionOutput.competitionId,
        unit: 's',
        value: 600
    }
    await createAttempt.execute(inputCreateAttemptFirstAthlete);
    const inputSecondAthleteOutput = {
        name: 'second athlete',
        cpf: '62373753090',
        age: '28'
    }
    const registerSecondAthleteOutput = await registerAthlete.execute(inputSecondAthleteOutput)
    const inputCreateAttemptSecondAthlete = {
        athleteId: registerSecondAthleteOutput.athleteId,
        competitionId: createCompetitionOutput.competitionId,
        unit: 'm',
        value: 9
    }
    await createAttempt.execute(inputCreateAttemptSecondAthlete);
    const inputThirdAthleteOutput = {
        name: 'third athlete',
        cpf: '76533030051',
        age: '41'
    }
    const registerThirdAthleteOutput = await registerAthlete.execute(inputThirdAthleteOutput)
    const inputCreateAttemptThirdAthlete = {
        athleteId: registerThirdAthleteOutput.athleteId,
        competitionId: createCompetitionOutput.competitionId,
        unit: 's',
        value: 400
    }
    const getRankingInput = {
        page: undefined,
        limit: undefined,
        competitionId: createCompetitionOutput.competitionId,
    }
    await createAttempt.execute(inputCreateAttemptThirdAthlete);
    const getRankingOutput = await getRanking.execute(getRankingInput);
    expect(getRankingOutput).toEqual(expect.arrayContaining([
        expect.objectContaining({ value: 600, unit: 's', position: 1 }),
        expect.objectContaining({ value: 9, unit: 'm', position: 2 }),
        expect.objectContaining({ value: 400, unit: 's', position: 3 })
    ]));
})
