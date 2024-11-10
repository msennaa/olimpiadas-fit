export const createCompetitionType = {
    post: {
        tags: ["CompetitionType"],
        summary: "Cria um novo tipo de competição",
        // description: "Cria um novo recurso de Athlete",
        parameters: [
            {
                in: "body",
                name: "body",
                description: "Parametros para criar um tipo de competição",
                required: true,
                schema: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                    },
                },
            },
        ],
        responses: {
            "200": {
                description: "Tipo de competição criado com sucesso",
                schema: {
                    type: "object",
                    properties: {
                        competitionTypeId: { type: "string" },
                    },
                },
            },
            "422": {
                description: "Parametros inválidos",
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
