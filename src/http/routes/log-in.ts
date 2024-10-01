import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { logIn } from "../../functions/log-in";
import type { CustomError } from "../../types/common";

export const logInRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/log-in",
    {
      schema: {
        body: z.object({
          email: z.string(),
          password: z.string(),
        }),
      },
    },
    async (request, response) => {
      const { email, password } = request.body;

      try {
        const result = await logIn({
          email,
          password,
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
