import { fastify } from "fastify";
import cors from "fastify-cors";

import ModuleLoader from "./modules";
import dbPlugin from "./services/db.service";
import jwtPlugin from "./services/jwt.service";

const app = fastify();

app.register(cors, { origin: true });
app.register(dbPlugin);
app.register(jwtPlugin);
app.register(ModuleLoader);

app.listen(3000, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`ℹ️  Listening on: ${address}!`);
});
