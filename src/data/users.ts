import { faker } from "@faker-js/faker";
import { sleep } from "../utils";

export type User = {
  name: string;
  biography: string;
  id: number;
};

const usersRepo: { [id: number]: User } = {};

export function createUser(id: number) {
  if (id > 10) return;
  usersRepo[id] = {
    name: faker.person.fullName(),
    biography: faker.person.bio(),
    id,
  };
}

for (let i = 1; i <= 10; i++) {
  createUser(i);
}

export async function getUsers(cursor = 0): Promise<User[]> {
  let res: User[] = [];
  for (let i = cursor + 1; i <= cursor + 5; i++) {
    if (i > 10) continue;
    res.push(usersRepo[i]);
  }
  await sleep(1000);
  return res;
}

export async function getUserById(id: number): Promise<User | undefined> {
  if (id > 10) return undefined;
  await sleep(1000);
  return usersRepo[id];
}

export async function getTopAuthors(): Promise<
  Array<User & { totalLikes: number }>
> {
  // return top 5 authors that have the most cumulative likes across all their posts along with their cumulative likes
  return [];
}
