import { ValidationError } from '../../../shared/domain/errors/ValidationError';

export default class Status {
    private value: string;

    constructor(status: string) {
        if (status !== 'in-progress' && status !== 'finished') {
            throw new ValidationError('Invalid status');
        }
        this.value = status;
    }

    getValue() {
        return this.value;
    }

    setStatus(status: string) {
        this.value = new Status(status).getValue();
    }
}
