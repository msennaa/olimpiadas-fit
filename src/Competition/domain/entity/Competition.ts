import crypto from 'crypto';
import Status from '../vo/Status';

export default class Competition {
    private status: Status;

    constructor(readonly id: string, readonly name: string, status: string, readonly competitionTypeId: string, readonly startCompetition: Date, public endCompetition: Date | null) {
        this.status = new Status(status);
    }

    static create(name: string, competitionTypeId: string,): Competition {
        const competitionId = crypto.randomUUID();
        const status = 'in-progress';
        const startCompetition = new Date();
        const endCompetition = null;
        return new Competition(competitionId, name, status, competitionTypeId, startCompetition, endCompetition);
    }

    getStatus() {
        return this.status.getValue();
    }

    finishCompetition(): void {
        if (this.status.getValue() !== 'in-progress') throw new Error('Competition is not in progress');
        this.status.setStatus('finished');
        this.endCompetition = new Date();
    }
}
