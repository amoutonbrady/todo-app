import { FastifyInstance } from "fastify";
import { AuthController } from "./auth/auth.controller";

import { TaskController } from "./task/task.controller";

export default async function ModuleLoader(app: FastifyInstance) {
  const controllers = [TaskController, AuthController];

  for (const controller of controllers) {
    app.register(controller);
    console.log(`✅ ${controller.name} registered successfully`);
  }
}
