import DatabaseConnection from '../../../../shared/application/database/DatabaseConnection';
import { NotFoundError } from '../../../../shared/domain/errors/NotFoundError';
import AthleteRepository from '../../../application/repository/AthleteRepository';
import Athlete from '../../../domain/entity/Athlete';

export default class AthleteRepositoryDatabase implements AthleteRepository {
    constructor(readonly connection: DatabaseConnection) { }
    async save(athlete: Athlete): Promise<void> {
        await this.connection.query('INSERT INTO athlete (id, name, cpf, age) VALUES ($1, $2, $3, $4)', [athlete.id, athlete.getName(), athlete.getCpf(), athlete.getAge()]);
    }

    async getById(athleteId: string): Promise<Athlete> {
        const [athleteData] = await this.connection.query('SELECT * FROM athlete WHERE id = $1', [athleteId]);
        if (!athleteData) throw new NotFoundError('Athlete not found');
        return new Athlete(athleteData.id, athleteData.name, athleteData.cpf, athleteData.age);
    }

    async getByCpf(cpf: string): Promise<Athlete | null> {
        const [athleteData] = await this.connection.query('SELECT * FROM athlete WHERE cpf = $1', [cpf]);
        if (!athleteData) return null;
        return new Athlete(athleteData.id, athleteData.name, athleteData.cpf, athleteData.age);
    }
}
