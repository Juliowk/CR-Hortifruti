import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { MongoConnect } from "../database/Mongo.js";

const userDefault = {
  name: process.env.NAME_USER_DEFAULT ?? "root",
  password: process.env.PASSWORD_USER_DEFAULT ?? "123abc456",
};

export const createUserDefault = async () => {
  const userExist = await await MongoConnect.db
    .collection("users")
    .findOne({ name: userDefault.name });

  if (userExist) return;

  const encryptedPassword = await bcrypt.hash(userDefault.password, 10);

  const user = {
    ...userDefault,
    password: encryptedPassword,
  };

  const { insertedId } = await MongoConnect.db
    .collection("users")
    .insertOne(user);

  const userInserted = await MongoConnect.db
    .collection("users")
    .findOne({ _id: new ObjectId(insertedId) });

  if (!userInserted) return console.error("Usuario default não criado!");

  console.log("Usuario default criado!");
};