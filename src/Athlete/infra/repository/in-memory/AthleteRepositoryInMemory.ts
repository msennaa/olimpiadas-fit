import { NotFoundError } from '../../../../shared/domain/errors/NotFoundError';
import AthleteRepository from '../../../application/repository/AthleteRepository';
import Athlete from '../../../domain/entity/Athlete';

export default class AthleteRepositoryMemory implements AthleteRepository {
    athletes: Athlete[];

    constructor() {
        this.athletes = [];
    }

    async save(athlete: Athlete): Promise<void> {
        this.athletes.push(athlete);
    }

    async getById(athleteId: string): Promise<Athlete> {
        const athlete = this.athletes.find((athlete: Athlete) => athlete.getId() === athleteId);
        if (!athlete) throw new NotFoundError('Athlete not found');
        return athlete;
    }

    async getByCpf(cpf: string): Promise<Athlete | null> {
        const athlete = this.athletes.find((athlete: Athlete) => athlete.getCpf() === cpf);
        return athlete || null;
    }
}
