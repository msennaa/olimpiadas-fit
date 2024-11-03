import CompetitionTypeRepository from '../../../application/repository/CompetitionTypeRepository';
import CompetitionType from '../../../domain/entity/CompetitionType';

export default class CompetitionTypeRepositoryInMemory implements CompetitionTypeRepository {
    competitionMissionTypes: CompetitionType[];

    constructor() {
        this.competitionMissionTypes = [];
    }

    async save(competitionType: CompetitionType): Promise<void> {
        this.competitionMissionTypes.push(competitionType);
    }

    async getById(competitionTypeId: string): Promise<CompetitionType | null> {
        const competitionType = this.competitionMissionTypes.find((competitionType: CompetitionType) => competitionType.id === competitionTypeId);
        return competitionType || null;
    }

    async getByName(competitionName: string): Promise<CompetitionType | null> {
        const competitionType = this.competitionMissionTypes.find((competitionType: CompetitionType) => competitionType.getName() === competitionName);
        return competitionType || null;
    }
}