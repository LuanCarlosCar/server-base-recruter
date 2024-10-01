import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const tblUsuario = pgTable("tbl_usuario", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  idEmpresa: text("id_empresa").notNull(),
  nome: text("nome").notNull(),
  sobrenome: text("sobrenome").notNull(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  flagStatus: integer("flag_status").notNull().default(1),
  dtCriacao: timestamp("dt_criacao", { withTimezone: true })
    .notNull()
    .defaultNow(),
  ultimaAlteracao: timestamp("ultima_alteracao", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const tlbEmpresa = pgTable("tbl_empresa", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  empresa: text("empresa").notNull(),
  flagStatus: integer("flag_status").notNull().default(1),
  dtCriacao: timestamp("dt_criacao", { withTimezone: true })
    .notNull()
    .defaultNow(),
  ultimaAlteracao: timestamp("ultima_alteracao", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
