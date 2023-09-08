import fp from "fastify-plugin";
import {} from "../data/users";
import { getPostByAuthorId, getPostById, getPosts, Post } from "../data/posts";

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp(async (fastify, opts) => {
  fastify.decorate("posts", {
    findMany: async (cursor?: number, authorId?: number) => {
      if (authorId) {
        return await getPostByAuthorId(authorId);
      }
      return await getPosts(cursor);
    },
    findUnique: async ({ id }: { id: number }) => {
      return await getPostById(id);
    },
  });
});

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  export interface FastifyInstance {
    posts: {
      findMany(cursor?: number, authorId?: number): Promise<Post[]>;
      findUnique({ id }: { id: number }): Promise<Post | undefined>;
    };
  }
}
