import { registerAthlete } from './athletes/paths/registerAthlete';
import { athleteTag } from './athletes/tags/athletes';
import { createCompetition } from './competition/schema/createCompetition.schema';
import { getCompetitionById } from './competition/schema/getCompetitionById.schema';
import { competitionTag } from './competition/tags/competition';

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
    tags: [athleteTag, competitionTag],
    schemes: ["http"],
    paths: {
        "/Athlete": registerAthlete,
        "/Competition": createCompetition,
        '/Competition/{id}': getCompetitionById,
    },
};
