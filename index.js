"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const userDb = new database_1.Database('users');
const newUser = userDb.create({
    name: "Joao Colussi",
    email: "joaocolussi@gmail.com"
});
console.log(newUser);
