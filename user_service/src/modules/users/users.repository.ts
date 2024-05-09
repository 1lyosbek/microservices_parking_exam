import { InjectRepository } from "@nestjs/typeorm";
import { IUserRepository } from "./interfaces/users.repo.interface";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";

export class UserRepository implements IUserRepository {
    constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) {}
    async getUsers(): Promise<Array<UserEntity>> {
        return await this.repository.find();
    }
    async getUserById(id: number): Promise<UserEntity> {
        return await this.repository.findOneBy({id});
    }
    async getUserByPhone(phone: string): Promise<UserEntity> {
        return await this.repository.findOneBy({phone});
    }
    async createUser(entity: UserEntity): Promise<UserEntity> {
        return await this.repository.save(entity);
    }
    async updateUser(entity: UserEntity): Promise<UserEntity> {
        return await this.repository.save(entity);
    }
    async deleteUser(entity: UserEntity): Promise<UserEntity> {
        return await this.repository.remove(entity);
    }
}