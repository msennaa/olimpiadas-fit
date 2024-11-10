export const getRankingByCompetitionId = {
    get: {
        tags: ["Competition"],
        summary: "Obter ranking de uma competição",
        // description: "Retorna uma competição específica usando o ID",
        produces: ["application/json"],
        parameters: [
            {
                name: "competitionId",
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
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            position: { type: "integer", description: "Posição no ranking" },
                            athlete: { type: "string", description: "Nome do atleta" },
                            value: { type: "string", description: "Valor da unidade de medida" },
                            unit: { type: "string", description: "Unidade de medida" },
                        },
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
