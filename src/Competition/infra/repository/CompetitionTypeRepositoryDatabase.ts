import DatabaseConnection from '../../../shared/application/database/DatabaseConnection';
import CompetitionTypeRepository from '../../application/repository/CompetitionTypeRepository';
import CompetitionType from '../../domain/entity/CompetitionType';

export default class CompetitionTypeRepositoryDatabase implements CompetitionTypeRepository {
    constructor(readonly connection: DatabaseConnection) { }

    async save(competitionType: CompetitionType): Promise<void> {
        await this.connection.query('INSERT INTO competition_type (id, name) VALUES ($1, $2)', [competitionType.id, competitionType.getName()]);
    }

    async getById(competitionTypeId: string): Promise<CompetitionType | null> {
        const [competitionTypeData] = await this.connection.query('SELECT * FROM competition_type WHERE id = $1', [competitionTypeId]);
        if (!competitionTypeData) return null;
        return new CompetitionType(competitionTypeData.id, competitionTypeData.name);
    }

    async getByName(competitionName: string): Promise<CompetitionType | null> {
        const [competitionTypeData] = await this.connection.query('SELECT * FROM competition_type WHERE name = $1', [competitionName]);
        if (!competitionTypeData) return null;
        return new CompetitionType(competitionTypeData.id, competitionTypeData.name);
    }
}
