import { UserReturn } from "../../protocols.js";

export interface IParamsCreateUser {
  name: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: IParamsCreateUser): Promise<UserReturn>;
}
