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

    async getRanking(competitionId: string, page: number, pageSize: number, competitionType: string): Promise<any[]> {
        const filteredAttempts = this.attempt.filter(attempt => attempt.competitionId === competitionId && attempt.getDeletedAt() === null);
        const processedAttempts = filteredAttempts.map(attempt => {
            let baseValue = attempt.getValue();
            if (attempt.getUnit() === 'ml' || attempt.getUnit() === 'mg') {
                baseValue = attempt.getValue() / 1000;
            } else if (attempt.getUnit() === 's') {
                baseValue = attempt.getValue() / 60;
            } else if (attempt.getUnit() === 'cm') {
                baseValue = attempt.getValue() / 100;
            }
            return {
                athleteId: attempt.athleteId,
                athleteName: 'any_name',
                value: attempt.getValue(),
                unit: attempt.getUnit(),
                baseValue,
            };
        });
        const distinctAttempts = processedAttempts.filter((value, index, self) =>
            index === self.findIndex((t) => t.athleteId === value.athleteId)
        );
        const sortedAttempts = distinctAttempts.sort((a, b) => b.baseValue - a.baseValue);
        const attemptsWithRowNumber = sortedAttempts.map((attempt, index) => ({
            position: index + 1,
            athlete: attempt.athleteName,
            value: attempt.value,
            unit: attempt.unit,
        }));
        const offset = (page - 1) * pageSize;
        const paginatedAttempts = attemptsWithRowNumber.slice(offset, offset + pageSize);
        return paginatedAttempts;
    }
}
