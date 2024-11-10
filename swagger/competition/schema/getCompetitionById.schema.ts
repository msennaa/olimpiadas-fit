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
                        id: { type: "integer" },
                        nome: { type: "string" },
                    },
                },
            },
            "422": {
                description: "Athlete não encontrado",
            },
        },
    },
}
