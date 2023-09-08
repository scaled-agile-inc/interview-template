import fp from "fastify-plugin";
import { getUserById, getUsers, User } from "../data/users";

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp(async (fastify, opts) => {
  fastify.decorate("users", {
    findMany: async (cursor) => {
      return await getUsers(cursor);
    },
    findUnique: async (id) => {
      return await getUserById(id);
    },
  });
});

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  export interface FastifyInstance {
    users: {
      findMany(cursor?: number): Promise<User[]>;
      findUnique(id: number): Promise<User | undefined>;
    };
  }
}
