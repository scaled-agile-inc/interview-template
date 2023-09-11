import { faker } from "@faker-js/faker";
import { sleep } from "../utils";

export type Post = {
  content: string;
  authorId: number;
  id: number;
  likes: number;
};

const postsRepo: { [id: number]: Post } = {};

export function createPost(id: number) {
  if (id > 500) return;

  postsRepo[id] = {
    content: faker.lorem.sentences(),
    authorId: faker.number.int({ min: 1, max: 50 }),
    likes: faker.number.int({ min: 0, max: 100 }),
    id,
  };
}

for (let i = 1; i <= 500; i++) {
  createPost(i);
}

export async function getPosts(cursor = 0): Promise<Post[]> {
  let res: Post[] = [];
  for (let i = cursor + 1; i <= cursor + 10; i++) {
    if (i > 500) continue;
    res.push(postsRepo[i]);
  }
  await sleep(1000);
  return res;
}

export async function getPostById(id: number): Promise<Post | undefined> {
  if (id > 500) return undefined;
  await sleep(1000);
  return postsRepo[id];
}

export async function getPostByAuthorId(authorId: number): Promise<Post[]> {
  // return all posts with a specified authorId
  return [];
}
