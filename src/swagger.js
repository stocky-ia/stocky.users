const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "stocky.users Swagger",
            version: "1.0.0",
            description:
                "Descrição das APIs do microsserviço stocky.users",
        },
        servers: [
            {
                url: "http://localhost:3131",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
