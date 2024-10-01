import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { logIn } from "../../functions/log-in";

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

      console.log("email", email, password);

      try {
        const result = await logIn({
          email,
          password,
        });
        return response.send(result);
      } catch (error) {
        const statusCode = (error as any).statusCode || 500;
        return response.status(statusCode).send({ error: error.message });
      }
    }
  );
};
