import Attempt from '../factory/Attempt';

export default interface AttemptRepository {
    save(attempt: Attempt): Promise<void>;
    allowedToAttempt(athleteId: string, competitionId: string, competitionName: string): Promise<boolean>;
}
