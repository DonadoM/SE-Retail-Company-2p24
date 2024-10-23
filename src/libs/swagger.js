import { NextResponse } from "next/server";
import swaggerJsDoc from "swagger-jsdoc";

// Definir las opciones de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API for managing inventory",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./src/app/api/*.ts", "./src/app/api/swaggerSchemas.ts"], // Asegúrate de incluir la ruta a tus esquemas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Endpoint para acceder a la documentación de Swagger
export const GET = async () => {
  return NextResponse.json(swaggerDocs, { status: 200 });
};

export default swaggerDocs();
