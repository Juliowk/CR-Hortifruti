import { ZodError } from "zod";
import { MongoConnect } from "../../../database/Mongo.js";
import {
  bodySchemaUser,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  IController,
  UserReturn,
} from "../../protocols.js";

import { ICreateUserRepository, IParamsCreateUser } from "./protocol.js";

export class CreateUserController implements IController {
  constructor(private readonly repository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<IParamsCreateUser>
  ): Promise<HttpResponse<UserReturn | string | Record<string, string[]>>> {
    try {
      if (!httpRequest.body) {
        return {
          statusCode: HttpStatusCode.BAD_REQUEST,
          body: "Request body is missing.",
        };
      }

      bodySchemaUser.parse(httpRequest.body);

      const userExist = await MongoConnect.db
        .collection("users")
        .findOne({ name: httpRequest.body.name });

      if (userExist)
        return {
          statusCode: HttpStatusCode.BAD_REQUEST,
          body: "Username already exists",
        };

      const user = await this.repository.createUser(httpRequest.body);

      return {
        statusCode: HttpStatusCode.CREATED,
        body: user,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.reduce((acc, err) => {
          const field = err.path.join(".");
          acc[field] = acc[field] || [];
          acc[field].push(err.message);
          return acc;
        }, {} as Record<string, string[]>);

        return {
          statusCode: HttpStatusCode.BAD_REQUEST,
          body: formattedErrors,
        };
      }

      return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: `Server Error: ${error}`,
      };
    }
  }
}
