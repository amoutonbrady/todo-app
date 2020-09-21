import { User } from "@prisma/client";
import { FastifyPluginAsync, preValidationHookHandler } from "fastify";
import jwt from "fastify-jwt";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: preValidationHookHandler;
  }
  interface FastifyRequest {
    dbUser: User;
  }
}

const jwtPlugin: FastifyPluginAsync = async (app) => {
  app.register(jwt, { secret: "aze789" });

  const validateToken: preValidationHookHandler = async (req, rep) => {
    try {
      const { user } = await req.jwtVerify<{ user: number }>();
      req.dbUser = await app.db.user.findOne({ where: { id: user } });
    } catch (err) {
      rep.send(err);
    }
  };

  app.decorate("authenticate", validateToken);
};

export default fp(jwtPlugin, "3.x");
