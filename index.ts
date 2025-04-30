import { Database } from "./database";

type User = {
    id: number,
    name: string,
    email: string
}

const userDb = new Database<User>('users');

const newUser = userDb.create({
    name: "Joao Colussi",
    email: "joaocolussi@gmail.com"
});
console.log(newUser);
