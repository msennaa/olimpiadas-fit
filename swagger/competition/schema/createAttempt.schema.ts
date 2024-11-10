export const createAttempt = {
    post: {
        tags: ["Attempt"],
        summary: "Cria uma nova tentativa",
        // description: "Cria um novo recurso de Athlete",
        parameters: [
            {
                in: "body",
                name: "body",
                description: "Parâmetros para criar uma tentativa",
                required: true,
                schema: {
                    type: "object",
                    properties: {
                        athleteId: { type: "string" },
                        competitionId: { type: "string" },
                        unit: { type: "string" },
                        value: { type: "number" },
                    },
                },
            },
        ],
        responses: {
            "200": {
                description: "Tentativa criada com sucesso",
                schema: {
                    type: "object",
                    properties: {
                        attemptId: { type: "string" },
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
