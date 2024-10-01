import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import fastifyCors from "@fastify/cors";
import { createUserRoute } from "./routes/create-user";
import { createEnterpriseRoute } from "./routes/create-enterprise";
import { logInRoute } from "./routes/log-in";
import { authenticateTokenRoute } from "./routes/authenticate-token";
import { createEnterprisesRoute } from "./routes/enterprises";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, { origin: "*" });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

//UserRoute
app.register(createUserRoute);
app.register(logInRoute);

//authenticateTokenRoute
app.register(authenticateTokenRoute);

//EnterpriseRoute
app.register(createEnterpriseRoute);
app.register(createEnterprisesRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("oi");
  });
