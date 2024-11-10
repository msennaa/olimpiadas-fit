import { ValidationError } from '../../../shared/domain/errors/ValidationError';

export default class Name {
    private value: string;

    constructor(name: string) {
        if (name.length < 3) throw new ValidationError('Name must have at least 3 characters');
        if (!name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new ValidationError('Invalid name');
        this.value = name;
    }

    getValue() {
        return this.value;
    }
}
