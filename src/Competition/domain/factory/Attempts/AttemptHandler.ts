import Attempt from '../../../application/factory/Attempt';
import { DartAttempt } from './DartAttempt';
import { HydrationAttempt } from './HydrationAttempt';
import { LoseWeightAttempt } from './LoseWeightAttempt';
import { MeditationAttempt } from './MeditationAttempt';

export class AttemptFactory {
    static create(competitionType: string, athleteId: string, competitionId: string, unit: string, value: number): Attempt {
        switch (competitionType.toLowerCase()) {
            case 'hydration':
                return new HydrationAttempt(athleteId, competitionId, unit, value);
            case 'meditation':
                return new MeditationAttempt(athleteId, competitionId, unit, value);
            case 'lose weight':
                return new LoseWeightAttempt(athleteId, competitionId, unit, value);
            case 'dart':
                return new DartAttempt(athleteId, competitionId, unit, value);
            default:
                throw new Error('Invalid competition type');
        }
    }
}
