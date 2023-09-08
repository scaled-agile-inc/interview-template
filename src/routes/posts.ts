import { FastifyPluginAsync } from "fastify";

export const autoPrefix = "/posts";

const posts: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // get all posts with schema validation
  // get all posts for a user
  // get a single post
};

export default posts;
