import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

import {
  bodySchemaUser,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  IController,
} from "../../protocols.js";

import { ILoginRepository, IParamsLoginUser } from "./protocols.js";

export class LoginController implements IController {
  constructor(private readonly repository: ILoginRepository) {}
  async handle(
    httpRequest: HttpRequest<IParamsLoginUser>
  ): Promise<HttpResponse<string>> {
    try {
      if (!httpRequest.body) {
        return {
          statusCode: HttpStatusCode.BAD_REQUEST,
          body: "Request body not provided.",
        };
      }
      bodySchemaUser.parse(httpRequest.body);

      const { name, password } = httpRequest.body;

      const userExist = await this.repository.verifyUser(name);

      if (!userExist) {
        return {
          statusCode: HttpStatusCode.BAD_REQUEST,
          body: `Incorrect name or password.`,
        };
      }

      const user = await this.repository.returnUser(name);

      const verifyPassword = await bcrypt.compare(password, user.password);

      if (!verifyPassword) {
        return {
          statusCode: HttpStatusCode.BAD_REQUEST,
          body: `Incorrect name or password.`,
        };
      }

      const secret = process.env.JWT_PASS ?? "tokendevlopment";

      const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });

      return {
        statusCode: HttpStatusCode.OK,
        body: token,
      };
    } catch (error) {
      return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: `Server Error: ${error}`,
      };
    }
  }
}
