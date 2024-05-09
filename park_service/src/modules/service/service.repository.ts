import { InjectRepository } from "@nestjs/typeorm";
import { ServiceEntity } from "./entities/service.entity";
import { Repository } from "typeorm";
import { IServiceRepository } from "./interfaces/service.repo.interface";

export class ServiceRepository implements IServiceRepository {
    constructor(@InjectRepository(ServiceEntity) private repository: Repository<ServiceEntity>) {}
    async createService(service: ServiceEntity): Promise<ServiceEntity> {
        return this.repository.save(service);
    }
    async getServices(): Promise<ServiceEntity[]> {
        return this.repository.find();
    }
    async getServiceById(id: number): Promise<ServiceEntity> {
        return this.repository.findOneBy({id});
    }
    async deleteService(entity: ServiceEntity): Promise<ServiceEntity> {
        return await this.repository.remove(entity);
    }
    async updateService(service: ServiceEntity): Promise<ServiceEntity> {
        return this.repository.save(service);
    }
}