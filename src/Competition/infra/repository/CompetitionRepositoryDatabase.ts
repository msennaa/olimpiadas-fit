import DatabaseConnection from '../../../shared/application/database/DatabaseConnection';
import CompetitionRepository from '../../application/repository/CompetitionRepository';
import Competition from '../../domain/entity/Competition';

export default class CompetitionRepositoryDatabase implements CompetitionRepository {
    constructor(readonly connection: DatabaseConnection) { }

    async save(competition: Competition): Promise<void> {
        await this.connection.query('INSERT INTO competition (id, name, status, competition_type_id, start_competition, end_competition) VALUES ($1, $2, $3, $4, $5, $6)', [competition.id, competition.getName(), competition.getStatus(), competition.competitionTypeId, competition.startCompetition, competition.endCompetition]);
    }

    async getById(competitionId: string): Promise<Competition | null> {
        const [competitionData] = await this.connection.query('SELECT * FROM competition WHERE id = $1', [competitionId]);
        if (!competitionData) return null;
        return new Competition(competitionData.id, competitionData.name, competitionData.status, competitionData.competitionTypeId, competitionData.startCompetition, competitionData.endCompetition);
    }
}
