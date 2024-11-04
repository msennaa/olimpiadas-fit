import AthleteRepository from '../../../Athlete/application/repository/AthleteRepository';
import UseCase from '../../../shared/application/usecase/UseCase';
import { AttemptFactory } from '../../domain/factory/Attempts/AttemptHandler';
import AttemptRepositoryDatabase from '../../infra/repository/database/AttemptRepository';
import CompetitionRepository from '../repository/CompetitionRepository';
import CompetitionTypeRepository from '../repository/CompetitionTypeRepository';

export default class CreateAttempt implements UseCase {
    constructor(readonly attemptRepository: AttemptRepositoryDatabase, readonly competitionRepository: CompetitionRepository, readonly athleteRepository: AthleteRepository, readonly competitionTypeRepository: CompetitionTypeRepository) { }

    async execute(input: Input): Promise<Output> {
        const competition = await this.competitionRepository.getById(input.competitionId);
        if (!competition) throw new Error('Competition not found');
        const competitionType = await this.competitionTypeRepository.getById(competition.competitionTypeId);
        if (!competitionType) throw new Error('Competition type not found');
        const athlete = await this.athleteRepository.getById(input.athleteId);
        if (!athlete) throw new Error('Athlete not found');
        const allowedToAttempt = await this.attemptRepository.allowedToAttempt(athlete.id, competition.id, competitionType.getName());
        if (!allowedToAttempt) throw new Error('Athlete not allowed to attempt');
        const attempt = AttemptFactory.create(competitionType.getName(), athlete.id, competition.id, input.unit, input.value);
        await this.attemptRepository.save(attempt);
        return {
            attemptId: attempt.getId(),
        }
    }
}

type Output = {
    attemptId: string;
}

type Input = {
    athleteId: string;
    competitionId: string;
    unit: string;
    value: number;
}
