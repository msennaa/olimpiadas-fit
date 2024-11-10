import UseCase from '../../../shared/application/usecase/UseCase';
import AthleteRepository from '../repository/AthleteRepository';

export default class GetAthleteById implements UseCase {
    constructor(readonly athleteRepository: AthleteRepository) { }

    async execute(athleteId: string): Promise<Output> {
        const athlete = await this.athleteRepository.getById(athleteId);
        return {
            athleteId: athlete.getId(),
            name: athlete.getName(),
            age: athlete.getAge()
        }
    }
}

type Output = {
    athleteId: string,
    name: string,
    age: number
}
