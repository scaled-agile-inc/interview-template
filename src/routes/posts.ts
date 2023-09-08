import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

export const autoPrefix = "/posts";

const posts: FastifyPluginAsyncTypebox = async (
  fastify,
  opts,
): Promise<void> => {};

export default posts;
