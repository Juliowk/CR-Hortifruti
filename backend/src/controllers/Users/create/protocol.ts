import User from "../../../models/User.js";

export type UserReturn = Omit<User, "password">;

export interface IParamsCreateUser {
  name: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: IParamsCreateUser): Promise<UserReturn>;
}
