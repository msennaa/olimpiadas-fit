import { registerAthlete } from './athletes/paths/registerAthlete';
import { athleteTag } from './athletes/tags/athletes';
import { createAttempt } from './competition/schema/createAttempt.schema';
import { createCompetition } from './competition/schema/createCompetition.schema';
import { createCompetitionType } from './competition/schema/createCompetitionType.schema';
import { finishCompetition } from './competition/schema/finishCompetition.schema';
import { getCompetitionById } from './competition/schema/getCompetitionById.schema';
import { getRankingByCompetitionId } from './competition/schema/getRanking.schema';
import { attemptTag } from './competition/tags/attempt';
import { competitionTag } from './competition/tags/competition';
import { competitionTypeTag } from './competition/tags/competitionType';

export const swaggerDocument = {
    swagger: "2.0",
    info: {
        description: "Esta é a API do projeto Olimpíadas Fit. Aqui, você encontra todas as rotas e modelos relacionados aos atletas e competições.",
        version: "1.0.0",
        title: "API Olimpíadas Fit",
        // termsOfService: "http://seusite.com/termos/",
        // contact: {
        //     email: "suporte@seusite.com",
        // },
        // license: {
        //     name: "Apache 2.0",
        //     url: "http://www.apache.org/licenses/LICENSE-2.0.html",
        // },
    },
    // host: "localhost:5000",
    // basePath: "/api/v1",
    tags: [athleteTag, competitionTag, attemptTag, competitionTypeTag],
    schemes: ["http"],
    paths: {
        "/Athlete": registerAthlete,
        "/Competition": createCompetition,
        '/Competition/{id}': getCompetitionById,
        '/Competition/finished/{id}': finishCompetition,
        '/ranking/{competitionId}': getRankingByCompetitionId,
        '/attempt/:{competitionId}': createAttempt,
        '/competition-type': createCompetitionType
    },
};
