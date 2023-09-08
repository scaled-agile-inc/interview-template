import { Type } from "@sinclair/typebox";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

export const autoPrefix = "/users";

const User = Type.Object({
  name: Type.String(),
  biography: Type.String(),
  id: Type.Number(),
});

const users: FastifyPluginAsyncTypebox = async (
  fastify,
  opts,
): Promise<void> => {
  fastify.get(
    "/",
    {
      schema: {
        querystring: Type.Object({ cursor: Type.Optional(Type.Number()) }),
        response: { 200: Type.Array(User) },
      },
    },
    async function (request, reply) {
      // implement cursor
      return fastify.users.findMany();
    },
  );

  fastify.get(
    "/:id",
    {
      schema: {
        params: Type.Object({ id: Type.Number() }),
        response: { 200: User },
      },
    },
    async function (request, reply) {
      const { id } = request.params;

      // place code here
      return reply.notImplemented(`use the ${id}`);
    },
  );
};

export default users;
