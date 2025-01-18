import {
  bodySchemaUser,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  IController,
} from "../../protocols.js";

import {
  ICreateUserRepository,
  IParamsCreateUser,
  UserReturn,
} from "./protocol.js";

export class CreateUserController implements IController {
  constructor(private readonly repository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<IParamsCreateUser>
  ): Promise<HttpResponse<UserReturn | string>> {
    try {
      if (!httpRequest.body) {
        return {
          statusCode: HttpStatusCode.BAD_REQUEST,
          body: "Request body is missing.",
        };
      }

      bodySchemaUser.parse(httpRequest.body);

      const user = await this.repository.createUser(httpRequest.body);

      return {
        statusCode: HttpStatusCode.CREATED,
        body: user,
      };
      
    } catch (error) {
      return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: `Unable to add user ${error}`,
      };
    }
  }
}