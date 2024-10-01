import { env } from "../env";
const jwt = require("jsonwebtoken");

export function generateToken(userId: string) {
  const secret = env.JWT_SECRET;
  const token = jwt.sign({ id: userId }, secret, {
    expiresIn: "1h",
  });
  return token;
}
