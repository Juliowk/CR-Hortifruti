import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { MongoConnect } from "./database/Mongo.js";
import routerProducts from "./routes/products.js";
import routerUploads from "./routes/images.js";

const main = async () => {
  dotenv.config();

  const PORT = process.env.PORT || "4000";

  await MongoConnect.connect();

  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/products", routerProducts);

  app.use("/upload", routerUploads);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main();
