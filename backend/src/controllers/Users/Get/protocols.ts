import User from "../../../models/User.js";

export interface IGetUsersRepository {
    getUsers(): Promise<User[]>
}