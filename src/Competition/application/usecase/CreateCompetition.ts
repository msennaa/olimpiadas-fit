import UseCase from '../../../shared/application/usecase/UseCase';
import Competition from '../../domain/entity/Competition';
import CompetitionRepository from '../repository/CompetitionRepository';
import CompetitionTypeRepository from '../repository/CompetitionTypeRepository';

export default class CreateCompetition implements UseCase {
    constructor(readonly competitionRepository: CompetitionRepository, readonly competitionTypeRepository: CompetitionTypeRepository) { }

    async execute(input: Input): Promise<Output> {
        const existingCompetitionType = await this.competitionTypeRepository.getById(input.competitionTypeId);
        if (!existingCompetitionType) throw new Error('Competition type not found');
        const competition = Competition.create(input.name, input.competitionTypeId);
        await this.competitionRepository.save(competition);
        return { competitionId: competition.id }
    }
}

type Input = {
    name: string;
    competitionTypeId: string;
}

type Output = {
    competitionId: string;
}
