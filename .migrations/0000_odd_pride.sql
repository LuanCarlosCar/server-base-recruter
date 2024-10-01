CREATE TABLE IF NOT EXISTS "tbl_usuario" (
	"id" text PRIMARY KEY NOT NULL,
	"id_empresa" text NOT NULL,
	"nome" text NOT NULL,
	"sobrenome" text NOT NULL,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"flag_status" integer DEFAULT 1 NOT NULL,
	"dt_criacao" timestamp with time zone DEFAULT now() NOT NULL,
	"ultima_alteracao" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_empresa" (
	"id" text PRIMARY KEY NOT NULL,
	"empresa" text NOT NULL,
	"flag_status" integer DEFAULT 1 NOT NULL,
	"dt_criacao" timestamp with time zone DEFAULT now() NOT NULL,
	"ultima_alteracao" timestamp with time zone DEFAULT now() NOT NULL
);
