import { AttemptBase } from '../../entity/Attempt';

export class HydrationAttempt extends AttemptBase {
    validate(unit: string, value: number): void {
        if (!['ml', 'l'].includes(unit.toLowerCase())) throw new Error('Invalid unit');
        if (value < 0) throw new Error('Invalid value');
    }
}
