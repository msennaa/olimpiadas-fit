import DatabaseConnection from '../../../shared/application/database/DatabaseConnection';
import CompetitionRepository from '../../application/repository/CompetitionRepository';
import Competition from '../../domain/entity/Competition';

export default class CompetitionRepositoryDatabase implements CompetitionRepository {
    constructor(readonly connection: DatabaseConnection) { }
    async save(competition: Competition): Promise<void> {
        await this.connection.query('INSERT INTO competition (id, name, status, competition_type_id, start_competition, end_competition) VALUES ($1, $2, $3, $4, $5, $6)', [competition.id, competition.getName(), competition.getStatus(), competition.competitionTypeId, competition.startCompetition, competition.endCompetition]);
    }

    async getById(competitionId: string): Promise<Competition> {
        const [competitionData] = await this.connection.query('SELECT * FROM competition WHERE id = $1', [competitionId]);
        if (!competitionData) throw new Error('Competition not found');
        return new Competition(competitionData.id, competitionData.name, competitionData.status, competitionData.competition_type_id, competitionData.start_competition, competitionData.end_competition);
    }

    async updateCompetition(competition: Competition): Promise<void> {
        await this.connection.query('update competition set name = $1, status = $2, competition_type_id = $3, start_competition = $4, end_competition = $5 where id = $6', [competition.getName(), competition.getStatus(), competition.competitionTypeId, competition.startCompetition, competition.endCompetition, competition.id]);
    }
}
