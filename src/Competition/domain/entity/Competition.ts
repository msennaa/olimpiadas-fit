import crypto from 'crypto';

export default class Competition {
    constructor(readonly id: string, readonly name: string, readonly status: string, readonly competitionTypeId: string, readonly startCompetition: Date, readonly endCompetition: Date | null) {

    }

    static create(name: string, competitionTypeId: string,): Competition {
        const competitionId = crypto.randomUUID();
        const status = 'in-progress';
        const startCompetition = new Date();
        const endCompetition = null;
        return new Competition(competitionId, name, status, competitionTypeId, startCompetition, endCompetition);
    }
}
