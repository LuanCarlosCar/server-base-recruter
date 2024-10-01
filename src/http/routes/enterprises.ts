import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createEnterprise } from "../../functions/create-enterprise";
import { db } from "../../db";
import { tlbEmpresa } from "../../db/schema";

export const createEnterprisesRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/enterprises",
    {
      schema: {},
    },
    async (request, response) => {
      const enterprises = await db.select().from(tlbEmpresa).execute();

      console.log("enterprises", enterprises);

      return response.send(enterprises);
    }
  );
};
