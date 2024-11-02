import HttpServer from '../../../shared/application/http/HttpServer';
import CreateCompetitionType from '../../application/usecase/CreateCompetitionType';

export default class CompetitionTypeController {

    constructor(readonly httpServer: HttpServer, readonly createCompetitionType: CreateCompetitionType) {
        this.httpServer?.register('post', "/competition-type", async (params: any, body: any) => {
            const response = await this.createCompetitionType.execute(body);
            return response;
        })
    }
}
