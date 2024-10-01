import { eq } from "drizzle-orm";
import { db } from "../db";
import { tlbEmpresa } from "../db/schema";
import type { CustomError } from "../types/common";

interface CreateUserRequest {
  empresa: string;
}

export async function createEnterprise(request: CreateUserRequest) {
  const previousEnterprise = await db
    .select()
    .from(tlbEmpresa)
    .where(eq(tlbEmpresa.empresa, request.empresa))
    .execute();

  if (previousEnterprise.length) {
    const error = new Error("Empresa já existe!");
    (error as CustomError).statusCode = 404; // Adiciona um código de status
    throw error;
  }

  const result = await db
    .insert(tlbEmpresa)
    .values({ empresa: request.empresa })
    .returning();

  const empresa = result[0];

  return {
    ...empresa,
  };
}
