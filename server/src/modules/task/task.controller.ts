import { FastifyInstance } from "fastify";
import { TaskCreateInput, TaskUpdateInput } from "@prisma/client";

import {
  getTaskDto,
  createTaskDto,
  updateTaskDto,
  deleteTaskDto,
} from "./task.schema";

export async function TaskController(app: FastifyInstance) {
  function ensureUser(userId: number) {
    return {
      async hasRightsForTask(id: number) {
        const tasks = await app.db.task.findMany({ where: { id, userId } });
        return tasks.length > 0;
      },
    };
  }

  app.get(
    "/tasks",
    { preValidation: [app.authenticate] },
    async ({ dbUser }) => {
      return app.db.task.findMany({ where: { userId: dbUser.id } });
    }
  );

  app.get<{ Params: { id: number } }>(
    "/tasks/:id",
    { schema: getTaskDto, preValidation: [app.authenticate] },
    async ({ dbUser, params }) => {
      const user = app.db.task.findMany({
        where: { id: params.id, userId: dbUser.id },
        take: 1,
      });

      return user[0];
    }
  );

  // Create a task
  app.post<{
    Params: { id: number };
    Body: Pick<TaskCreateInput, "title" | "status" | "description">;
  }>(
    "/tasks",
    { schema: createTaskDto, preValidation: [app.authenticate] },
    async ({ body, dbUser }) => {
      return app.db.task.create({
        data: { ...body, user: { connect: { id: dbUser.id } } },
      });
    }
  );

  // Update a task
  app.patch<{
    Params: { id: number };
    Body: Pick<TaskUpdateInput, "title" | "status" | "description">;
  }>(
    "/tasks/:id",
    { schema: updateTaskDto, preValidation: [app.authenticate] },
    async ({ params, body, dbUser }, rep) => {
      const canUpdate = await ensureUser(dbUser.id).hasRightsForTask(params.id);
      if (!canUpdate) return rep.code(400) && undefined;

      return app.db.task.update({
        where: { id: params.id },
        data: { ...body, user: { connect: { id: dbUser.id } } },
      });
    }
  );

  // Delete a task
  app.delete<{ Params: { id: number } }>(
    "/tasks/:id",
    { schema: deleteTaskDto, preValidation: [app.authenticate] },
    async ({ params, dbUser }, rep) => {
      const canUpdate = await ensureUser(dbUser.id).hasRightsForTask(params.id);
      if (!canUpdate) return rep.code(400) && undefined;

      await app.db.task.delete({ where: { id: params.id } });
      return rep.code(204) && undefined;
    }
  );
}
