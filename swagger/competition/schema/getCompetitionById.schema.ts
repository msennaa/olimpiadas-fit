export const getCompetitionById = {
    get: {
        tags: ["Competition"],
        summary: "Obter uma competição pelo id",
        description: "Retorna uma competição específica usando o ID",
        produces: ["application/json"],
        parameters: [
            {
                name: "id",
                in: "path",
                description: "ID da Competição",
                required: true,
                type: "string",
                format: "uuid",
            },
        ],
        responses: {
            "200": {
                description: "Operação bem-sucedida",
                schema: {
                    type: "object",
                    properties: {
                        competitionId: { type: "string" },
                        competitionTypeId: { type: "string" },
                        name: { type: "string" },
                        status: { type: "string" },
                        startCompetition: { type: "string" },
                        endCompetition: { type: "string" },
                    },
                },
            },
            "422": {
                description: "Competição não encontrada",
                schema: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                },
            },
        },
    },
}
