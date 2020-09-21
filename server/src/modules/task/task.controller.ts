import { FastifyInstance } from "fastify";
import { TaskCreateInput, TaskUpdateInput } from "@prisma/client";

import {
  getTaskDto,
  createTaskDto,
  updateTaskDto,
  deleteTaskDto,
} from "./task.schema";

export async function TaskController(app: FastifyInstance) {
  app.get("/tasks", async () => {
    return app.db.task.findMany();
  });

  app.get<{ Params: { id: number } }>(
    "/tasks/:id",
    { schema: getTaskDto },
    async ({ params }) => {
      return app.db.task.findOne({ where: { id: params.id } });
    }
  );

  // Create a task
  app.post<{
    Params: { id: number };
    Body: Pick<TaskCreateInput, "title" | "status" | "description">;
  }>("/tasks", { schema: createTaskDto }, async ({ body }) => {
    return app.db.task.create({ data: body });
  });

  // Update a task
  app.patch<{
    Params: { id: number };
    Body: Pick<TaskUpdateInput, "title" | "status" | "description">;
  }>("/tasks/:id", { schema: updateTaskDto }, async ({ params, body }) => {
    return app.db.task.update({
      where: { id: params.id },
      data: body,
    });
  });

  // Delete a task
  app.delete<{ Params: { id: number } }>(
    "/tasks/:id",
    { schema: deleteTaskDto },
    async ({ params }, rep) => {
      await app.db.task.delete({ where: { id: params.id } });
      rep.code(204);
      return undefined;
    }
  );
}
