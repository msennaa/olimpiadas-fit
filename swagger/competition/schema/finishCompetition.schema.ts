export const finishCompetition = {
    put: {
        tags: ["Competition"],
        summary: "Finalizar uma competição",
        description: "Finaliza uma competição",
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
                        status: { type: "string" },
                    },
                },
            },
            "404": {
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
