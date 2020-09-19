import { fastify } from "fastify";
import { PrismaClient } from "@prisma/client";
import cors from "fastify-cors";

const app = fastify();
app.register(cors, { origin: true });
const db = new PrismaClient();

app.get("/tasks", async (req, rep) => {
  return db.task.findMany();
});

app.get("/tasks/:id", async (req, rep) => {
  return db.task.findOne({ where: { id: +req.params.id } });
});

// Create a task
app.post("/tasks", async (req, rep) => {
  return db.task.create({
    data: req.body,
  });
});

// Update a task
app.patch("/tasks/:id", async (req, rep) => {
  return db.task.update({
    where: { id: +req.params.id },
    data: req.body,
  });
});

// Delete a task
app.delete("/tasks/:id", async (req, rep) => {
  await db.task.delete({
    where: { id: +req.params.id },
  });

  rep.code(204);
  return undefined;
});

app.listen(3000, console.log);
