import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class Uuid {
    private id: string;

    constructor(id?: string) {
        this.id = id || uuidv4();
        this.validate();
    }

    private validate() {
        const isValid = uuidValidate(this.id);
        if (!isValid) {
            throw new InvalidUuidError();
        }
    }

    getValue() {
        return this.id;
    }
}

export class InvalidUuidError extends Error {
    constructor() {
        super('ID must be a valid UUID');
        this.name = 'InvalidUuidError';
    }
}
