import HttpServer from '../../../shared/application/http/HttpServer';
import CreateCompetition from '../../application/usecase/CreateCompetition';

export default class CompetitionController {

    constructor(readonly httpServer: HttpServer, readonly createCompetition: CreateCompetition) {
        this.httpServer?.register('post', "/competition", async (params: any, body: any) => {
            const response = await this.createCompetition.execute(body);
            return response;
        })
    }
}
