import AthleteRepository from '../../../Athlete/application/repository/AthleteRepository';
import UseCase from '../../../shared/application/usecase/UseCase';
import { BadRequestError } from '../../../shared/domain/errors/BadRequestError';
import { ForbiddenError } from '../../../shared/domain/errors/ForbiddenError';
import { AttemptFactory } from '../../domain/factory/Attempts/AttemptHandler';
import AttemptRepository from '../repository/AttemptRepository';
import CompetitionRepository from '../repository/CompetitionRepository';
import CompetitionTypeRepository from '../repository/CompetitionTypeRepository';

export default class CreateAttempt implements UseCase {
    constructor(readonly attemptRepository: AttemptRepository, readonly competitionRepository: CompetitionRepository, readonly athleteRepository: AthleteRepository, readonly competitionTypeRepository: CompetitionTypeRepository) { }

    async execute(input: Input): Promise<Output> {
        const competition = await this.competitionRepository.getById(input.competitionId);
        if (competition.getStatus() !== 'in-progress') throw new BadRequestError('Competition is not in progress');
        const competitionType = await this.competitionTypeRepository.getById(competition.competitionTypeId);
        const athlete = await this.athleteRepository.getById(input.athleteId);
        const allowedToAttempt = await this.attemptRepository.allowedToAttempt(athlete.getId(), competition.getId(), competitionType.getName());
        if (!allowedToAttempt) throw new ForbiddenError('Athlete not allowed to attempt');
        const attempt = AttemptFactory.create(competitionType.getName(), athlete.getId(), competition.getId(), input.unit, input.value);
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
