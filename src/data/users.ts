import {faker} from "@faker-js/faker";

export type User = {
  name: string,
  biography: string,
  id: number
}

const usersRepo: {[id: number]: User} = {};

export async function getUsers(cursor = 0): Promise<User[]> {
  let res: User[] = []
  for(let i = cursor + 1; i <= cursor + 10; i++) {
    if (i > 50) continue;
    if (!usersRepo[i]) {
      usersRepo[i] = {
        name: faker.person.fullName(),
        biography: faker.person.bio(),
        id: i
      }
    }
    res.push(usersRepo[i])
  }
  return res;
}

export async function getUserById(id: number): Promise<User | undefined> {
  if (id > 50) return undefined;
  if (!usersRepo[id]) {
    usersRepo[id] = {
      name: faker.person.fullName(),
      biography: faker.person.bio(),
      id
    }
  }
  return usersRepo[id]
}