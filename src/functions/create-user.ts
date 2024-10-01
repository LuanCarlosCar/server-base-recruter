import { eq } from "drizzle-orm";
import { generateToken } from "../common/tokengenerate";
import { db } from "../db";
import { tblUsuario } from "../db/schema";
const bcrypt = require("bcrypt");

interface CreateUserRequest {
  nome: string;
  sobrenome: string;
  email: string;
  password: string;
  idEmpresa: string;
}

export async function createUser(request: CreateUserRequest) {
  const { nome, sobrenome, email, idEmpresa, password } = request;

  const previousUser = await db
    .select()
    .from(tblUsuario)
    .where(eq(tblUsuario.email, email))
    .execute();

  if (previousUser.length) {
    const error = new Error("Email já cadastrado");
    (error as any).statusCode = 404; // Adiciona um código de status
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [user] = await db
    .insert(tblUsuario)
    .values({
      nome,
      sobrenome,
      email,
      idEmpresa: idEmpresa,
      password: hashedPassword,
    })
    .returning();

  const token = generateToken(user.id);

  return {
    idUsuario: user.id,
    nome: user.nome,
    sobrenome: user.sobrenome,
    email: user.email,
    idEmpresa: user.idEmpresa,
    token,
  };
}
