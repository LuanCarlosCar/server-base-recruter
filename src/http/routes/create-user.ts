import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createUser } from "../../functions/create-user";

export const createUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/create-user",
    {
      schema: {
        body: z.object({
          nome: z.string(),
          sobrenome: z.string(),
          email: z.string(),
          password: z.string(),
          idEmpresa: z.string(),
        }),
      },
    },
    async (request, response) => {
      const { nome, sobrenome, email, idEmpresa, password } = request.body;

      try {
        const result = await createUser({
          nome,
          sobrenome,
          email,
          password,
          idEmpresa,
        });

        return response.send(result);
      } catch (error) {
        const statusCode = (error as any).statusCode || 500;

        console.log("error.message", error.message);
        return response.status(statusCode).send({ error: error.message });
      }
    }
  );
};
