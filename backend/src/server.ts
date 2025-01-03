import express from "express";
import dotenv from "dotenv";

import { MongoConnect } from "./database/Mongo";
import routerProducts from "./routes/products";

const main = async () => {
  dotenv.config();

  const PORT = process.env.PORT || "4000";

  await MongoConnect.connect();

  const app = express();
  app.use(express.json());

  app.use("/products", routerProducts)

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main();
