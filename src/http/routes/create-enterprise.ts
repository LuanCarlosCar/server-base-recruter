import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createEnterprise } from "../../functions/create-enterprise";

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
        const statusCode = (error as any).statusCode || 500;

        console.log("error.message", error.message);
        return response.status(statusCode).send({ error: error.message });
      }
    }
  );
};
