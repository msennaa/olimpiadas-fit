import { NotFoundError } from '../../../../shared/domain/errors/NotFoundError';
import CompetitionRepository from '../../../application/repository/CompetitionRepository';
import Competition from '../../../domain/entity/Competition';

export default class CompetitionRepositoryInMemory implements CompetitionRepository {
    competition: Competition[];

    constructor() {
        this.competition = [];
    }

    async save(competition: Competition): Promise<void> {
        this.competition.push(competition);
    }

    async getById(competitionId: string): Promise<Competition> {
        const competition = this.competition.find((competition: Competition) => competition.id === competitionId);
        if (!competition) throw new NotFoundError('Competition not found');
        return competition
    }

    async updateCompetition(competition: Competition): Promise<void> {
        const competitionIndex = this.competition.findIndex((competition: Competition) => competition.id === competition.id);
        this.competition[competitionIndex] = competition;
    }
}
