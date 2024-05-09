import { InjectRepository } from "@nestjs/typeorm";
import { IParkRepository } from "./interfaces/park.repo.interface";
import { ParkEntity } from "./entities/park.entity";
import { Repository } from "typeorm";

export class ParkRepository implements IParkRepository {
    constructor(@InjectRepository(ParkEntity) private repository: Repository<ParkEntity>) { }
    async getParks(): Promise<Array<ParkEntity>> {
        return await this.repository.find();
    }
    async getParkById(id: number): Promise<ParkEntity> {
        return await this.repository.findOneBy({ id });
    }
    async createPark(entity: ParkEntity): Promise<ParkEntity> {
        return await this.repository.save(entity);
    }
    async updatePark(entity: ParkEntity): Promise<ParkEntity> {
        return await this.repository.save(entity);
    }
    async deletePark(entity: ParkEntity): Promise<ParkEntity> {
        const deletd = await this.repository.remove(entity);
        return deletd;
    }
}