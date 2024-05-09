import { InjectRepository } from "@nestjs/typeorm";
import { IUserDetailRepository } from "./interfaces/user-detail.repo.interface";
import { UserDetailEntity } from "./entities/user-detail.entity";
import { Repository } from "typeorm";

export class UserDetailRepository implements IUserDetailRepository{
    constructor(@InjectRepository(UserDetailEntity) private repository: Repository<UserDetailEntity>) {}
    async getUserDetails(): Promise<Array<UserDetailEntity>> {
        return await this.repository.find();
    }
    async createUserDetail(entity: UserDetailEntity): Promise<UserDetailEntity> {
        return await this.repository.save(entity);
    }
    async updateUserDetail(entity: UserDetailEntity): Promise<UserDetailEntity> {
        return await this.repository.save(entity);
    }
    async deleteUserDetail(entity: UserDetailEntity): Promise<UserDetailEntity> {
        return await this.repository.remove(entity);
    }
    async getUserDetailById(id: number): Promise<UserDetailEntity> {
        return await this.repository.findOneBy({id});
    }
}