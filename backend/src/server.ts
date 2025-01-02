import express from "express";
import dotenv from "dotenv";

import { MongoConnect } from "./database/Mongo";

await MongoConnect.connect();

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
