import { InjectRepository } from "@nestjs/typeorm";
import { LayerEntity } from "./entities/layer.entity";
import { Repository } from "typeorm";
import { ILayerRepository } from "./interfaces/layer.repo.interface";

export class LayerRepository implements ILayerRepository {
    constructor(@InjectRepository(LayerEntity) private repository: Repository<LayerEntity>) {}
    async createLayer(layer: LayerEntity): Promise<LayerEntity> {
        return this.repository.save(layer);
    }
    async getLayerById(id: number): Promise<LayerEntity> {
        return this.repository.findOneBy({id});
    }
    async getLayers(): Promise<LayerEntity[]> {
        return this.repository.find();
    }
    async updateLayer(layer: LayerEntity): Promise<LayerEntity> {
        return this.repository.save(layer);
    }
    async deleteLayer(entity: LayerEntity): Promise<LayerEntity> {
        return await this.repository.remove(entity);
    }
}