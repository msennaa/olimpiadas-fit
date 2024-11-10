import Name from '../vo/Name';
import { Uuid } from '../../../shared/domain/vo/Uuid';

export default class CompetitionType {
    private name: Name;
    private id: Uuid;

    constructor(id: string, name: string) {
        this.id = new Uuid(id);
        this.name = new Name(name);
    }

    static create(name: string): CompetitionType {
        const competitionTypeId = new Uuid();
        return new CompetitionType(competitionTypeId.getValue(), name);
    }

    getName() {
        return this.name.getValue();
    }

    getId() {
        return this.id.getValue();
    }
}
