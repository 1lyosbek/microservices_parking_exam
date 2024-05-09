import { InjectRepository } from "@nestjs/typeorm";
import { IShotRepository } from "./interfaces/shot.repo.interface";
import { ShotEntity } from "./entities/shot.entity";
import { Repository } from "typeorm";

export class ShotRepository implements IShotRepository {
    constructor(@InjectRepository(ShotEntity) private repository: Repository<ShotEntity> ) {}
    async createShot(entity: ShotEntity): Promise<ShotEntity> {
        return this.repository.save(entity);
    }
    async getShots(): Promise<ShotEntity[]> {
        return this.repository.find();
    }
    async getShotById(id: number): Promise<ShotEntity> {
        return this.repository.findOneBy({id});
    }
    async getShotByUserId(userId: number): Promise<ShotEntity>{
        return this.repository.findOneBy({userId});
    }
    async deleteShot(entity: ShotEntity): Promise<ShotEntity> {
        return await this.repository.remove(entity);
    }
    async updateShot(entity: ShotEntity): Promise<ShotEntity> {
        return this.repository.save(entity);
    }
}