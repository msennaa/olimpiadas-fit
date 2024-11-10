import { ValidationError } from '../../../../shared/domain/errors/ValidationError';
import { AttemptBase } from '../../entity/Attempt';

export class DartAttempt extends AttemptBase {
    validate(unit: string, value: number): void {
        if (!['cm', 'm'].includes(unit.toLowerCase())) throw new ValidationError('Invalid unit');
        if (value < 0) throw new ValidationError('Invalid value');
    }
}
