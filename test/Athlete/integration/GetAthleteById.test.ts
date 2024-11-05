import GetAthleteById from '../../../src/Athlete/application/usecase/GetAthleteById';
import RegisterAthlete from '../../../src/Athlete/application/usecase/RegisterAthlete';
import AthleteRepositoryMemory from '../../../src/Athlete/infra/repository/in-memory/AthleteRepositoryInMemory';

let registerAthlete: RegisterAthlete;
let getAthleteById: GetAthleteById;

beforeEach(async () => {
    const athleteRepository = new AthleteRepositoryMemory();
    registerAthlete = new RegisterAthlete(athleteRepository);
    getAthleteById = new GetAthleteById(athleteRepository);
})

test('Should register an athlete successfully and get it', async function () {
    const inputRegisterAthleteOutput = {
        name: 'any name',
        cpf: '31896670040',
        age: '18'
    }
    const registerAthleteOutput = await registerAthlete.execute(inputRegisterAthleteOutput)
    expect(registerAthleteOutput.athleteId).toBeDefined();
    const getAthleteByIdOutput = await getAthleteById.execute(registerAthleteOutput.athleteId);
    expect(getAthleteByIdOutput.athleteId).toBe(registerAthleteOutput.athleteId);
    expect(getAthleteByIdOutput.name).toBe(inputRegisterAthleteOutput.name);
    expect(getAthleteByIdOutput.age).toBe(+inputRegisterAthleteOutput.age);
})

test('Should register an athlete successfully', async function () {
    const athleteId = 'ba037c63-9680-4c5e-98c5-722e7abb0bd4'
    await expect(getAthleteById.execute(athleteId)).rejects.toThrow(new Error('Athlete not found'));
})
