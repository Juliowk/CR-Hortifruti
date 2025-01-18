import User from "../../../models/User.js";
import { HttpResponse, HttpStatusCode, IController } from "../../protocols.js";
import { IGetUsersRepository } from "./protocols.js";

export class GetUsersController implements IController {
    constructor(private readonly repository: IGetUsersRepository) {}
    async handle(): Promise<HttpResponse<User[] | string>> {
        try {
            const users = await this.repository.getUsers();
            return {
              statusCode: HttpStatusCode.OK,
              body: users,
            }
        } catch (error) {
            return {
              statusCode: HttpStatusCode.SERVER_ERROR,
              body: `Error returning users: ${error}`,
            };
        }
    }
}