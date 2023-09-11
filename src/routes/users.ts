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
      const { cursor } = request.query;
      return await fastify.users.findMany({ cursor });
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
      // please implement this RESTful route handler function
      return reply.notImplemented(`Please implement`);
    },
  );

  fastify.get(
    "/top",
    {
      schema: {
        response: {
          200: Type.Array(
            Type.Intersect([User, Type.Object({ totalLikes: Type.Number() })]),
          ),
        },
      },
    },
    async function (request, reply) {
      return await fastify.users.findMostLiked();
    },
  );
};

export default users;
