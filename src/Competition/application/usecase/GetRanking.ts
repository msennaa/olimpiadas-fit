import UseCase from '../../../shared/application/usecase/UseCase';
import AttemptRepository from '../repository/AttemptRepository';
import CompetitionRepository from '../repository/CompetitionRepository';

export default class GetRanking implements UseCase {
    constructor(readonly attemptRepository: AttemptRepository, readonly competitionRepository: CompetitionRepository, readonly competitionTypeRepository: any) { }

    async execute(input: Input): Promise<Output[]> {
        const competition = await this.competitionRepository.getById(input.competitionId);
        const competitionType = await this.competitionTypeRepository.getById(competition.competitionTypeId);
        input.page = input.page || 1;
        input.limit = input.limit || 10;
        const ranking = await this.attemptRepository.getRanking(competition.getId(), input.page, input.limit, competitionType.getName());
        return ranking;
    }
}

type Input = {
    competitionId: string;
    page?: number;
    limit?: number;
}

type Output = {
    position: number,
    athlete: string,
    unit: string,
    value: number
} 
