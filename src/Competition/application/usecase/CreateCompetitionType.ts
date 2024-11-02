import UseCase from '../../../shared/application/usecase/UseCase';
import CompetitionType from '../../domain/entity/CompetitionType';
import CompetitionTypeRepository from '../repository/CompetitionTypeRepository';

export default class CreateCompetitionType implements UseCase {
    constructor(readonly competitionTypeRepository: CompetitionTypeRepository) {

    }

    async execute(input: Input): Promise<Output> {
        const existingCompetitionType = await this.competitionTypeRepository.getByName(input.name);
        if (existingCompetitionType) throw new Error('Competition Type already exists');
        const competitionType = CompetitionType.create(input.name);
        await this.competitionTypeRepository.save(competitionType);
        return { competitionTypeId: competitionType.id };
    }

}

type Input = {
    name: string;
}

type Output = {
    competitionTypeId: string;
}
