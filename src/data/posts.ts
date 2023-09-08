import { faker} from "@faker-js/faker";

export type Post = {
  content: string,
  authorId: number,
  id: number
}

const postsRepo: {[id: number]: Post} = {};

export async function getPosts(cursor = 0): Promise<Post[]> {
  let res: Post[] = []
  for(let i = cursor + 1; i <= cursor + 10; i++) {
    if (i > 500) continue;

    if (!postsRepo[i]) {
      postsRepo[i] = {
        content: faker.lorem.sentences(),
        authorId: faker.number.int({min: 1, max: 50}),
        id: i
      }
    }
    res.push(postsRepo[cursor + i])
  }
  return res;
}

export async function  getPostById(id: number): Promise<Post | undefined> {
  if (id > 500) return undefined;
  if (!postsRepo[id]) {
    postsRepo[id] = {
      content: faker.lorem.sentences(),
      authorId: faker.number.int({min: 1, max: 50}),
      id
    }
  }
  return postsRepo[id]
}

async function createPost(authorId: number): Promise<Post> {
  let id = Object.keys(postsRepo).length + 1;
  postsRepo[id] = {
    content: faker.lorem.sentences(),
    authorId: authorId,
    id
  }

  return postsRepo[id]
}

export async function getPostByAuthorId(authorId: number): Promise<Post[]> {
  if (authorId > 50) return [];
  let userPostsMap: {[authorId: string]: Post[]} = {};

  for (const post of Object.values(postsRepo)) {
    if(userPostsMap[post.authorId]) {
      userPostsMap[post.authorId].push(post)
    } else {
      userPostsMap[post.authorId] = [post]
    }
  }

  if (userPostsMap[authorId]) {
    return userPostsMap[authorId]
  } else {
    let res: Post[] = [];

    for (let i = 1; i <= faker.number.int({min: 1, max: 10}); i++) {
      res.push(await createPost(authorId))
    }

    return res
  }
}