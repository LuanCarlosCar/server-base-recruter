import { eq } from "drizzle-orm";
import { db } from "../db";
import { tblUsuario } from "../db/schema";
import { generateToken } from "../common/tokengenerate";
import type { CustomError } from "../types/common";
const bcrypt = require("bcrypt");

interface LogInRequest {
  email: string;
  password: string;
}

export async function logIn(request: LogInRequest) {
  const { email, password } = request;

  const user = await db
    .select()
    .from(tblUsuario)
    .where(eq(tblUsuario.email, email))
    .execute();

  if (user.length === 0) {
    const error = new Error("Email invalido!");
    (error as CustomError).statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user[0].password);

  if (!isMatch) {
    const error = new Error("Senha incorreta");
    (error as CustomError).statusCode = 404;
    throw error;
  }

  const token = generateToken(user[0].id);

  const { idEmpresa, nome, sobrenome } = user[0];

  return { idUsuario: user[0].id, idEmpresa, nome, sobrenome, email, token };
}
