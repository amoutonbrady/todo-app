import { FastifyInstance } from "fastify";
import { compare, hash } from "bcrypt";
import { loginUserDto, meUserDto, registerUserDto } from "./auth.schema";

export async function AuthController(app: FastifyInstance) {
  app.get(
    "/me",
    { preValidation: [app.authenticate], schema: meUserDto },
    async ({ dbUser }) => {
      return dbUser;
    }
  );

  app.post<{ Body: { email: string; password: string } }>(
    "/register",
    { schema: registerUserDto },
    async ({ body }) => {
      const { email, password } = body;
      const hashPassword = await hash(password, 10);

      const user = await app.db.user.create({
        data: { email, password: hashPassword },
      });

      return {
        token: app.jwt.sign({ user: user.id }),
      };
    }
  );

  app.post<{ Body: { email: string; password: string } }>(
    "/login",
    { schema: loginUserDto },
    async ({ body }, rep) => {
      const { email, password } = body;

      const user = await app.db.user.findOne({ where: { email } });

      if (!user) {
        rep.code(400);
        return {};
      }

      const match = await compare(password, user.password);

      if (!match) {
        rep.code(400);
        return {};
      }

      return {
        token: app.jwt.sign({ user: user.id }),
      };
    }
  );
}
