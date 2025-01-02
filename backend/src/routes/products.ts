import { Router } from "express";
import { MongoConnect } from "../database/Mongo";

const routerProducts = Router();

routerProducts.get("/", async (req, res) => {
  const all = await MongoConnect.db.collection("products").find().toArray();
  res.status(200).json(all);
});

routerProducts.post("/", async (req, res) => {
  await MongoConnect.db.collection("products").insertOne({ name: "Júlio" });
  const all = await MongoConnect.db.collection("products").find().toArray();
  res.status(200).json(all);
});

export default routerProducts;
