import Athlete from '../../domain/entity/Athlete';

export default interface AthleteRepository {
    save(athlete: Athlete): Promise<void>;
    getById(athleteId: string): Promise<Athlete | null>;
    getByCpf(cpf: string): Promise<Athlete | null>;
}
