import HttpServer from '../../../shared/application/http/HttpServer';
import Queue from '../../../shared/application/Queue/Queue';
import CreateAttempt from '../../application/usecase/CreateAttempt';
import getRanking from '../../application/usecase/GetRanking';

export default class AttemptController {

    constructor(readonly httpServer: HttpServer, readonly createAttempt: CreateAttempt, readonly getRanking: getRanking, readonly queue: Queue) {
        this.httpServer?.register('post', '/attempt/:{competitionId}', async (params: any, body: any) => {
            const attemptData = Object.assign(params, body);
            const output = await this.createAttempt.execute(attemptData);
            return output;
        })

        this.httpServer?.register('get', '/ranking/:{competitionId}', async (params: any, body: any, query: any) => {
            const input = { competitionId: params.competitionId, page: query.page, limit: query.limit };
            const output = await this.getRanking.execute(input);
            return output;
        })


        this.httpServer?.register('post', '/async_attempt/:{competitionId}', async (params: any, body: any) => {
            const input = body;
            await this.queue.publish('competition', input);
        })
    }
}
