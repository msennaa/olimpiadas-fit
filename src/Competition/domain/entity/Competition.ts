import crypto from 'crypto';

export default class Competition {
    constructor(readonly id: string, readonly name: string, public status: string, readonly competitionTypeId: string, readonly startCompetition: Date, public endCompetition: Date | null) {

    }

    static create(name: string, competitionTypeId: string,): Competition {
        const competitionId = crypto.randomUUID();
        const status = 'in-progress';
        const startCompetition = new Date();
        const endCompetition = null;
        return new Competition(competitionId, name, status, competitionTypeId, startCompetition, endCompetition);
    }

    finishCompetition(): void {
        if (this.status !== 'in-progress') throw new Error('Competition is not in progress');
        this.status = 'finished';
        this.endCompetition = new Date();
    }
}
