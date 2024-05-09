import { InjectRepository } from "@nestjs/typeorm";
import { IUserTariffRepository } from "./interface/user-tariff.repo.interface";
import { UserTariffEntity } from "./entities/user-tariff.entity";
import { Repository } from "typeorm";

export class UserTariffRepository implements IUserTariffRepository {
    constructor(@InjectRepository(UserTariffEntity) private repository: Repository<UserTariffEntity>) {}
    async createUserTariff(userTariff: UserTariffEntity): Promise<UserTariffEntity> {
        return this.repository.save(userTariff);
    }
    async getUserTariffs(): Promise<Array<UserTariffEntity>> {
        return await this.repository.find();
    }
    async getUserTariffById(id: number): Promise<UserTariffEntity> {
        return await this.repository.findOneBy({id});
    }
    async updateUserTariff(entity: UserTariffEntity): Promise<UserTariffEntity> {
        return await this.repository.save(entity);
    }
    async deleteUserTariff(entity: UserTariffEntity): Promise<UserTariffEntity> {
        return await this.repository.remove(entity);
    }
}