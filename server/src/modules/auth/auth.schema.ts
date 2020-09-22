import { FastifySchema } from "fastify";

export const loginUserDto: FastifySchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string" },
      password: { type: "string" },
    },
  },
};

export const registerUserDto: FastifySchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string" },
      password: { type: "string" },
    },
  },
};

export const meUserDto: FastifySchema = {
  response: {
    "2xx": {
      type: "object",
      properties: {
        id: { type: "number" },
        email: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    },
  },
};
