import Competition from '../../domain/entity/Competition';

export default interface CompetitionRepository {
    save(competition: Competition): Promise<void>;
    getById(competitionId: string): Promise<Competition>;
}
