import { z } from "zod";
import User from "../models/User.js";

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
}

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}

export interface HttpResponse<T> {
  statusCode: HttpStatusCode;
  body: T;
}

export interface HttpRequest<T> {
  body?: T;
  params?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  headers?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  file?: Express.Multer.File;
}

export const bodySchema = z.object({
  name: z
    .string()
    .min(3, "O nome do produto deve ter no minimo 3 caracteres!")
    .refine(
      (value) => value.trim() !== "",
      "O nome não pode estar vazio ou conter apenas espaços!"
    ),
  price: z.number().min(0.1, "O preço deve ser maior que zero."),
  image: z.string().nonempty("Escolha uma imagem."),
});

export const bodySchemaUser = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres!")
    .max(50, "O nome deve ter no máximo 50 caracteres!")
    .refine(
      (value) => value.trim() !== "",
      "O nome não pode estar vazio ou conter apenas espaços!"
    ),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres!")
    .max(20, "A senha deve ter no máximo 20 caracteres!"),
});

export type UserReturn = Omit<User, "password">;