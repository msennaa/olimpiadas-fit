import Queue from '../../../shared/application/Queue/Queue';
import CreateAttempt from '../../application/usecase/CreateAttempt';

export default class QueueController {
    constructor(readonly queue: Queue, readonly createAttempt: CreateAttempt) {
        queue.consume('competition.createAttempt', async (input: any) => {
            await createAttempt.execute(input);
        })
    }
}
