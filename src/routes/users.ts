import { FastifyPluginAsync } from "fastify";
import { Type } from "@sinclair/typebox";

export const autoPrefix = "/users";

const User = Type.Object({
  name: Type.String(),
  biography: Type.String(),
  id: Type.Number(),
});

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/",
    { schema: { response: { 200: Type.Array(User) } } },
    async function (request, reply) {
      return fastify.users.findMany();
    },
  );

  fastify.get(
    "/:id",
    { schema: { params: { id: Type.Number() }, response: { 200: User } } },
    async function (request, reply) {
      // place code here
      return reply.notImplemented();
    },
  );
};

export default users;
