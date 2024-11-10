import UseCase from '../../../shared/application/usecase/UseCase';
import { ConflictError } from '../../../shared/domain/errors/ConflictError';
import Athlete from '../../domain/entity/Athlete';
import AthleteRepository from '../repository/AthleteRepository';

export default class RegisterAthlete implements UseCase {
    constructor(readonly athleteRepository: AthleteRepository) { }

    async execute(input: Input): Promise<Output> {
        const existingAthlete = await this.athleteRepository.getByCpf(input.cpf);
        if (existingAthlete) throw new ConflictError('Athlete already exists');
        const athlete = Athlete.create(input.name, input.cpf, +input.age);
        await this.athleteRepository.save(athlete);
        return { athleteId: athlete.id };
    }
}


type Input = {
    name: string,
    cpf: string,
    age: string,
}

type Output = {
    athleteId: string
}
