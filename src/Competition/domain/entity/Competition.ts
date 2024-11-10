import crypto from 'crypto';
import Status from '../vo/Status';
import Name from '../vo/Name';
import { BadRequestError } from '../../../shared/domain/errors/BadRequestError';
import { Uuid } from '../../../shared/domain/vo/Uuid';

export default class Competition {
    private status: Status;
    private name: Name;
    private id: Uuid;

    constructor(id: string, name: string, status: string, readonly competitionTypeId: string, readonly startCompetition: Date, public endCompetition: Date | null) {
        this.id = new Uuid(id);
        this.status = new Status(status);
        this.name = new Name(name);
    }

    static create(name: string, competitionTypeId: string,): Competition {
        const competitionId = new Uuid();
        const status = 'in-progress';
        const startCompetition = new Date();
        const endCompetition = null;
        return new Competition(competitionId.getValue(), name, status, competitionTypeId, startCompetition, endCompetition);
    }

    getStatus() {
        return this.status.getValue();
    }

    finishCompetition(): void {
        if (this.status.getValue() !== 'in-progress') throw new BadRequestError('Competition is not in progress');
        this.status.setStatus('finished');
        this.endCompetition = new Date();
    }

    getName() {
        return this.name.getValue();
    }

    getId() {
        return this.id.getValue();
    }
}
