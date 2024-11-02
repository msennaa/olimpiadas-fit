import HttpServer from '../../../shared/application/http/HttpServer'
import RegisterAthlete from '../../application/usecase/RegisterAthlete';

export default class AthleteController {

    constructor(readonly httpServer: HttpServer, readonly registerAthlete: RegisterAthlete) {
        this.httpServer?.register('post', "/athlete", async (params: any, body: any) => {
            const response = await this.registerAthlete.execute(body);
            return response;
        })
    }
}
