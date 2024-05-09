import { UserDetailEntity } from "../entities/user-detail.entity";

export interface IUserDetailRepository {
    getUserDetails(): Promise<Array<UserDetailEntity>>;
    createUserDetail(entity: UserDetailEntity): Promise<UserDetailEntity>;
    updateUserDetail(entity: UserDetailEntity): Promise<UserDetailEntity>;
    deleteUserDetail(entity: UserDetailEntity): Promise<UserDetailEntity>;
    getUserDetailById(id: number): Promise<UserDetailEntity>;
}