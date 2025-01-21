import { ObjectId } from "mongodb";

export type UserReturnLogin = {
  id: ObjectId;
  name: string;
  password: string;
};

export interface IParamsLoginUser {
  name: string;
  password: string;
}

export interface ILoginRepository {
  verifyUser(name: string): Promise<boolean>;
  returnUser(name:string): Promise<UserReturnLogin>
}
