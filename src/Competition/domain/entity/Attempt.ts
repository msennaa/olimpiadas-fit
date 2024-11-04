import Attempt from '../../application/factory/Attempt';

export abstract class AttemptBase implements Attempt {
    protected unit: string;
    protected value: number;
    private id: string;
    private createdAt: Date;
    private deletedAt: Date | null;

    constructor(
        public readonly athleteId: string,
        public readonly competitionId: string,
        unit: string,
        value: number
    ) {
        this.id = crypto.randomUUID();
        this.createdAt = new Date();
        this.deletedAt = null;
        this.validate(unit, value);
        this.unit = unit;
        this.value = value;
    }

    abstract validate(unit: string, value: number): void;

    getUnit(): string {
        return this.unit;
    }

    getValue(): number {
        return this.value;
    }

    getId(): string {
        return this.id;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getDeletedAt(): Date | null {
        return this.deletedAt;
    }
}
