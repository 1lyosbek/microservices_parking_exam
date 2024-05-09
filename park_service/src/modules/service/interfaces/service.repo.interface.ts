import { ServiceEntity } from "../entities/service.entity";

export interface IServiceRepository {
    getServices(): Promise<Array<ServiceEntity>>;
    getServiceById(id: number): Promise<ServiceEntity>;
    createService(entity: ServiceEntity): Promise<ServiceEntity>;
    updateService(entity: ServiceEntity): Promise<ServiceEntity>;
    deleteService(entity: ServiceEntity): Promise<ServiceEntity>;
}