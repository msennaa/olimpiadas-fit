import UseCase from '../../../shared/application/usecase/UseCase';
import Competition from '../../domain/entity/Competition';
import CompetitionRepository from '../repository/CompetitionRepository';

export default class FinishCompetition implements UseCase {
    constructor(readonly competitionRepository: CompetitionRepository) { }

    async execute(competitionId: string): Promise<Output> {
        const competition = await this.competitionRepository.getById(competitionId);
        competition.finishCompetition();
        await this.competitionRepository.updateCompetition(competition);
        return {
            competitionId: competition.getId(),
            status: competition.getStatus()
        }
    }
}

type Output = {
    competitionId: string;
    status: string
}
