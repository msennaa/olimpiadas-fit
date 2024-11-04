import { AttemptBase } from '../../entity/Attempt';

export class DartAttempt extends AttemptBase {
    validate(unit: string, value: number): void {
        if (!['cm', 'm'].includes(unit.toLowerCase())) throw new Error('Invalid unit');
        if (value < 0) throw new Error('Invalid value');
    }
}
