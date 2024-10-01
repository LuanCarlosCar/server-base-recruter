import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createEnterprise } from "../../functions/create-enterprise";
import type { CustomError } from "../../types/common";

export const createEnterpriseRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/create-enterprise",
    {
      schema: {
        body: z.object({
          empresa: z.string(),
        }),
      },
    },
    async (request, response) => {
      const { empresa } = request.body;

      try {
        const result = await createEnterprise({
          empresa,
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
