import CompetitionType from '../../domain/entity/CompetitionType';

export default interface CompetitionTypeRepository {
    save(competitionType: CompetitionType): Promise<void>;
    getById(competitionTypeId: string): Promise<CompetitionType>;
    getByName(competitionName: string): Promise<CompetitionType | null>;
}
