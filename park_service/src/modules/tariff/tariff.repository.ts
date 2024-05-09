import { InjectRepository } from "@nestjs/typeorm";
import { ITariffRepository } from "./interfaces/tariff.repo.interface";
import { TariffEntity } from "./entities/tariff.entity";
import { Repository } from "typeorm";

export class TariffRepository implements ITariffRepository{
    constructor(@InjectRepository(TariffEntity) private repository: Repository<TariffEntity>) {}
    async getTariffs(): Promise<TariffEntity[]> {
        return await this.repository.find();
    }
    async createTariff(tariff: TariffEntity): Promise<TariffEntity> {
        return await this.repository.save(tariff);
    }
    async updateTariff(tariff: TariffEntity): Promise<TariffEntity> {
        return await this.repository.save(tariff);
    }
    async deleteTariff(tariff: TariffEntity): Promise<TariffEntity> {
        return await this.repository.remove(tariff);
    }
    async getTariffById(id: number): Promise<TariffEntity> {
        return await this.repository.findOneBy({id});
    }
}