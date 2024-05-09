import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
    getUsers(): Promise<Array<UserEntity>>;
    getUserById(id: number): Promise<UserEntity>;
    getUserByPhone(phone: string): Promise<UserEntity>;
    createUser(user: UserEntity): Promise<UserEntity>;
    updateUser(user: UserEntity): Promise<UserEntity>;
    deleteUser(user: UserEntity): Promise<UserEntity>;
}