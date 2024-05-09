import { InjectRepository } from "@nestjs/typeorm";
import { IPlaceRepository } from "./interfaces/place.repo.intreface";
import { PlaceEntity } from "./entities/place.entity";
import { Repository } from "typeorm";

export class PlaceRepository implements IPlaceRepository {
    constructor(@InjectRepository(PlaceEntity) private repository: Repository<PlaceEntity>){}
    async createPlace(entity: PlaceEntity): Promise<PlaceEntity> {
        return this.repository.save(entity);
    }
    async getPlaces(): Promise<PlaceEntity[]> {
        return this.repository.find();
    }
    async getPlaceById(id: number): Promise<PlaceEntity> {
        return this.repository.findOneBy({id});
    }
    async updatePlace(place: PlaceEntity): Promise<PlaceEntity> {
        return this.repository.save(place);
    }
    async deletePlace(entity: PlaceEntity): Promise<PlaceEntity> {
        return await this.repository.remove(entity);
    }
}