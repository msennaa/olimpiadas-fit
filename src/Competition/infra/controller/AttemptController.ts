import HttpServer from '../../../shared/application/http/HttpServer';
import CreateAttempt from '../../application/usecase/CreateAttempt';

export default class AttemptController {

    constructor(readonly httpServer: HttpServer, readonly createAttempt: CreateAttempt) {
        this.httpServer?.register('post', '/attempt/:{competitionId}', async (params: any, body: any) => {
            const attemptData = Object.assign(params, body);
            const output = await this.createAttempt.execute(attemptData);
            return output;
        })
    }
}
