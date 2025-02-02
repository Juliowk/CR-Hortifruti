import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { createUserDefault } from "./helpers/UserDefault.js";
import { MongoConnect } from "./database/Mongo.js";

import routerProducts from "./routes/products.js";
import routerUser from "./routes/users.js";

const main = async () => {
  dotenv.config();

  const PORT = process.env.PORT || "4000";

  await MongoConnect.connect();

  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/products", routerProducts);
  app.use("/user", routerUser);

  createUserDefault();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main();
