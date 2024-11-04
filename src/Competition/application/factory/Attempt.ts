export default interface Attempt {
    athleteId: string;
    competitionId: string;
    getUnit(): string;
    getValue(): number;
    getId(): string;
    getCreatedAt(): Date;
    getDeletedAt(): Date | null;
    validate(unit: string, value: number): void;
}
