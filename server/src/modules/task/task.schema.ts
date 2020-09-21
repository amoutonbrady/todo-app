import { FastifySchema } from "fastify";

export const createTaskDto: FastifySchema = {
  body: {
    type: "object",
    required: ["title", "status"],
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      status: {
        type: "string",
        enum: ["TODO", "DONE"],
      },
    },
  },
};

export const updateTaskDto: FastifySchema = {
  params: {
    id: { type: "number" },
  },
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      status: {
        type: "string",
        enum: ["TODO", "DONE"],
      },
    },
  },
};

export const deleteTaskDto: FastifySchema = {
  params: {
    id: { type: "number" },
  },
};

export const getTaskDto: FastifySchema = {
  params: {
    id: { type: "number" },
  },
};
