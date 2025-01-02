import { Router } from "express";

import { GetProductsrepository } from "../repositorys/Products/Get/getProducts";
import { GetProductsController } from "../controllers/Products/Get/getProducts";

import { CreateProductRepository } from "../repositorys/Products/Post/createProduct";
import { CreateProductController } from "../controllers/Products/Post/createProduct";
import { DeleteProductRepository } from "../repositorys/Products/Delete/deleteProduct";
import { DeleteProductController } from "../controllers/Products/Delete/deleteProducts";

const routerProducts = Router();

routerProducts.get("/", async (req, res) => {
  const repository = new GetProductsrepository();
  const controller = new GetProductsController(repository);
  const { statusCode, body } = await controller.handle();
  res.status(statusCode).json(body);
});

routerProducts.post("/", async (req, res) => {
  const repository = new CreateProductRepository();
  const controller = new CreateProductController(repository);
  const { statusCode, body } = await controller.handle(req);
  res.status(statusCode).json(body);
});

routerProducts.delete("/:id", async (req, res) => {
  const repository = new DeleteProductRepository();
  const controller = new DeleteProductController(repository);
  const { statusCode, body } = await controller.handle(req);
  res.status(statusCode).json(body);
});

export default routerProducts;
