import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../../db";
import { tblUsuario } from "../../db/schema";
import { env } from "../../env";
import { eq } from "drizzle-orm";

const jwt = require("jsonwebtoken");

export const authenticateTokenRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/authenticate-token",
    {
      schema: {
        body: z.object({
          token: z.string(),
        }),
      },
    },
    async (request) => {
      const { token } = request.body;

      try {
        const secret = env.JWT_SECRET;

        const decoded = jwt.verify(token, secret) as { id: string };

        const [user] = await db
          .select()
          .from(tblUsuario)
          .where(eq(tblUsuario.id, decoded.id))
          .execute();
        const { idEmpresa, nome, sobrenome, id, email } = user;

        return { idEmpresa, nome, sobrenome, idUsuario: id, email };
      } catch (error) {
        throw new Error("Token inválido ou expirado.");
      }
    }
  );
};
