import { z } from "zod";

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
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
}

export const bodySchema = z.object({
  name: z.string().min(3, "O nome do produto deve ter no minimo 3 caracteres!"),
  price: z.number().min(0.1, "O preço deve ser maior que zero"),
});