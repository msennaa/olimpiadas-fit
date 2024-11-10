export const registerAthlete = {
    post: {
        tags: ["Athlete"],
        summary: "Criar um novo Athlete",
        description: "Cria um novo recurso de Athlete",
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
                        cpf: { type: "string" },
                        age: { type: "number" },
                    },
                },
            },
        ],
        responses: {
            "200": {
                description: "Athlete criado com sucesso",
            },
            "422": {
                description: "Parâmetros inválidos",
            },
        },
    },
}
