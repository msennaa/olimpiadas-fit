import Attempt from '../../../application/factory/Attempt';
import AttemptRepository from '../../../application/repository/AttemptRepository';

export default class AttemptInMemoryRepository implements AttemptRepository {
    private maxDartAttempt: number;
    private maxRestAttempt: number;
    attempt: Attempt[];

    constructor() {
        this.attempt = [];
        this.maxDartAttempt = 3;
        this.maxRestAttempt = 1;
    }

    async save(attempt: Attempt): Promise<void> {
        this.attempt.push(attempt);
    }

    async allowedToAttempt(athleteId: string, competitionId: string, competitionName: string): Promise<boolean> {
        const attempts = this.attempt.filter((attempt: Attempt) => attempt.athleteId === athleteId && attempt.competitionId === competitionId);
        return competitionName === 'dart' ? attempts.length < this.maxDartAttempt : attempts.length < this.maxRestAttempt;
    }
}
