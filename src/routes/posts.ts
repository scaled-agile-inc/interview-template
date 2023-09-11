import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

export const autoPrefix = "/posts";

const Post = Type.Object({
  id: Type.Number(),
  authorId: Type.Number(),
  likes: Type.Number(),
  content: Type.String(),
});

const posts: FastifyPluginAsyncTypebox = async (
  fastify,
  opts,
): Promise<void> => {
  fastify.get(
    "/",
    {
      schema: {
        querystring: Type.Object({
          cursor: Type.Optional(Type.Number()),
          authorId: Type.Optional(Type.Number()),
        }),
        response: { 200: Type.Array(Post) },
      },
    },
    async function (request, reply) {
      const { cursor, authorId } = request.query;

      const posts = await fastify.posts.findMany({
        cursor,
        authorId,
      });

      request.log.info({ posts });
      return posts;
    },
  );

  fastify.get(
    "/:id",
    {
      schema: {
        params: Type.Object({ id: Type.Number() }),
        response: { 200: Post },
      },
    },
    async function (request, reply) {
      const { id } = request.params;

      const post = await fastify.posts.findUnique({ id });

      if (!post) return reply.notFound();

      return post;
    },
  );
};

export default posts;
