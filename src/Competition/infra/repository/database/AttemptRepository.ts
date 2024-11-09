import DatabaseConnection from '../../../../shared/application/database/DatabaseConnection';
import Attempt from '../../../application/factory/Attempt';
import AttemptRepository from "../../../application/repository/AttemptRepository";
import { AttemptFactory } from '../../../domain/factory/Attempts/AttemptHandler';

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

    async getRanking(competitionId: string, page: number, pageSize: number): Promise<any[]> {
        const offset = (page - 1) * pageSize;
        const attemptsData = await this.connection.query(
            `select 
                ROW_NUMBER() OVER (order by "ranking".base_value DESC)::int AS position,
	            "ranking".name as "athlete",
	            "ranking".value,
	            "ranking".unit
            from
	            (select
                    distinct on (attempt.athlete_id) attempt.*,
		            athlete.name,
		            case
			            when unit = 'ml' then attempt.value / 1000
			            when unit = 'mg' then attempt.value / 1000
			            when unit = 's' then attempt.value / 60
			            when unit = 'cm' then attempt.value / 100
			        else value
		            end as base_value
	        from attempt
	        inner join athlete on
		    attempt.athlete_id = athlete.id
	        WHERE competition_id = $1 AND deleted_at IS NULL
            ORDER BY athlete_id) as "ranking"
	        LIMIT $2 
            OFFSET $3`,
            [competitionId, pageSize, offset]
        );
        return attemptsData;
    }
}

