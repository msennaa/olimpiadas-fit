export const createCompetition = {
    post: {
        tags: ["Competition"],
        summary: "Cria uma nova competição",
        // description: "Cria um novo recurso de Athlete",
        parameters: [
            {
                in: "body",
                name: "body",
                description: "Input de Athlete",
                required: true,
                schema: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        competitionTypeId: { type: "string" },
                    },
                },
            },
        ],
        responses: {
            "200": {
                description: "Competição criada com sucesso",
            },
            "422": {
                description: "Parâmetros inválidos",
            },
        },
    },
}
