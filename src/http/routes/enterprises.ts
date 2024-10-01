import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../../db";
import { tlbEmpresa } from "../../db/schema";

export const createEnterprisesRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/enterprises",
    {
      schema: {},
    },
    async (_, response) => {
      const enterprises = await db.select().from(tlbEmpresa).execute();

      return response.send(enterprises);
    }
  );
};
