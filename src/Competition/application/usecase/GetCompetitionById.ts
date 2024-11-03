import UseCase from '../../../shared/application/usecase/UseCase';
import CompetitionType from '../../domain/entity/CompetitionType';
import CompetitionRepository from '../repository/CompetitionRepository';
import CompetitionTypeRepository from '../repository/CompetitionTypeRepository';

export default class GetCompetitionById implements UseCase {
    constructor(readonly competitionRepository: CompetitionRepository) {

    }

    async execute(competitionId: string): Promise<Output> {
        const competition = await this.competitionRepository.getById(competitionId);
        return {
            competitionTypeId: competition.competitionTypeId,
            name: competition.getName(),
            status: competition.getStatus(),
            startCompetition: competition.startCompetition,
            endCompetition: competition.endCompetition,
        }
    }

}

type Output = {
    competitionTypeId: string;
    name: string,
    status: string,
    startCompetition: Date,
    endCompetition: Date | null,
}
