import RegisterAthlete from '../../../src/Athlete/application/usecase/RegisterAthlete';
import AthleteRepositoryDatabase from '../../../src/Athlete/infra/repository/AthleteRepositoryDatabase';
import DatabaseConnection from '../../../src/shared/application/database/DatabaseConnection';
import { PgPromiseAdapter } from '../../../src/shared/infra/database/PgPromiseAdapter';

let connection: DatabaseConnection;
let registerAthlete: RegisterAthlete;

beforeEach(async () => {
    connection = new PgPromiseAdapter();
    await connection.query('DELETE FROM athlete', [])
    const athleteRepository = new AthleteRepositoryDatabase(connection);
    registerAthlete = new RegisterAthlete(athleteRepository);
})

test('Should register an athlete successfully', async function () {
    const inputRegisterAthleteOutput = {
        name: 'any name',
        cpf: '31896670040',
        age: '18'
    }
    const registerAthleteOutput = await registerAthlete.execute(inputRegisterAthleteOutput)
    expect(registerAthleteOutput.athleteId).toBeDefined();
})

test('Should not register an athlete if exists', async function () {
    const inputRegisterAthleteOutput = {
        name: 'any name',
        cpf: '31896670040',
        age: '18'
    };
    await registerAthlete.execute(inputRegisterAthleteOutput);
    await expect(registerAthlete.execute(inputRegisterAthleteOutput)).rejects.toThrow(new Error('Athlete already exists'));
});

test('Should not register an athlete with invalid age', async function () {
    const inputRegisterAthleteOutput = {
        name: 'any name',
        cpf: '31896670040',
        age: 'aaaa'
    };
    await expect(registerAthlete.execute(inputRegisterAthleteOutput)).rejects.toThrow(new Error('Age must be a number'));
});

afterEach(async () => {
    connection.close();
})
