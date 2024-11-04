import { AttemptBase } from '../../entity/Attempt';

export class LoseWeightAttempt extends AttemptBase {
    validate(unit: string, value: number): void {
        if (!['kg', 'mg'].includes(unit.toLowerCase())) throw new Error('Invalid unit');
        if (value < 0) throw new Error('Invalid value');
    }
}
