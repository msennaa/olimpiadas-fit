import crypto from 'crypto';
import Name from '../vo/Name';

export default class CompetitionType {

    private name: Name;

    constructor(readonly id: string, name: string) {
        this.name = new Name(name);
    }

    static create(name: string): CompetitionType {
        const competitionId = crypto.randomUUID();
        return new CompetitionType(competitionId, name);
    }

    getName() {
        return this.name.getValue();
    }
}
