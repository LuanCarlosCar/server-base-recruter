import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createUser } from "../../functions/create-user";
import type { CustomError } from "../../types/common";

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
        const newError = error as CustomError;

        newError.statusCode || 500;

        return response
          .status(newError.statusCode)
          .send({ error: newError.message });
      }
    }
  );
};
