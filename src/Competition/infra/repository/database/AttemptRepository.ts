import DatabaseConnection from '../../../../shared/application/database/DatabaseConnection';
import Attempt from '../../../application/factory/Attempt';
import AttemptRepository from "../../../application/repository/AttemptRepository";

export default class AttemptRepositoryDatabase implements AttemptRepository {
    private maxDartAttempt: number;
    private maxRestAttempt: number;

    constructor(readonly connection: DatabaseConnection) {
        this.maxDartAttempt = 3;
        this.maxRestAttempt = 1;
    }

    async allowedToAttempt(athleteId: string, competitionId: string, competitionName: string): Promise<boolean> {
        const [attemptsData] = await this.connection.query('SELECT COUNT(*) FROM attempt where athlete_id = $1 and competition_id = $2 ', [athleteId, competitionId]);
        return competitionName === 'dart' ? attemptsData.count < this.maxDartAttempt : attemptsData.count < this.maxRestAttempt;
    }

    async save(attempt: Attempt): Promise<void> {
        await this.connection.query('INSERT into attempt (id, athlete_id, competition_id, unit, value, created_at, deleted_at) VALUES ($1, $2, $3, $4, $5, $6, $7)', [attempt.getId(), attempt.athleteId, attempt.competitionId, attempt.getUnit(), attempt.getValue(), attempt.getCreatedAt(), attempt.getDeletedAt()]);
    }
}

