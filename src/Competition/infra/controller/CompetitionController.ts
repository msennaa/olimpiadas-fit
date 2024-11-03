import HttpServer from '../../../shared/application/http/HttpServer';
import CreateCompetition from '../../application/usecase/CreateCompetition';
import FinishCompetition from '../../application/usecase/FinishCompetition';
import GetCompetitionById from '../../application/usecase/GetCompetitionById';

export default class CompetitionController {

    constructor(readonly httpServer: HttpServer, readonly createCompetition: CreateCompetition, readonly getCompetitionById: GetCompetitionById, readonly finishCompetition: FinishCompetition) {
        this.httpServer?.register('post', "/competition", async (params: any, body: any) => {
            const response = await this.createCompetition.execute(body);
            return response;
        })

        this.httpServer?.register('get', '/competition/:{competitionId}', async (params: any, body: any) => {
            const competitionId = params.competitionId;
            const output = await this.getCompetitionById.execute(competitionId);
            return output;
        })

        this.httpServer?.register('put', '/competition/finished/:{competitionId}', async (params: any, body: any) => {
            const competitionId = params.competitionId;
            const output = await this.finishCompetition.execute(competitionId);
            return output;
        })
    }
}
