import { Inject, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { IServiceRepository } from './interfaces/service.repo.interface';
import { ServiceEntity } from './entities/service.entity';
import { ServiceNotFoundException } from './exceptions/service.exceptions';
import { IUpdateServiceData } from './interfaces/service.contr.interface';

@Injectable()
export class ServiceService {
  constructor(@Inject("IServiceRepository") private serviceRepository: IServiceRepository) {}
  async create(createServiceDto: CreateServiceDto):Promise<ServiceEntity> {
    const newService = new ServiceEntity();
    newService.parkId = createServiceDto.parkId;
    newService.userId = createServiceDto.userId;
    newService.startedAt = createServiceDto.startedAt;
    newService.endedAt = createServiceDto.endedAt;
    newService.price = createServiceDto.price;
    newService.tariffId = createServiceDto.tariffId;
    const created = await this.serviceRepository.createService(newService);
    return created;
  }

  async findAll():Promise<Array<ServiceEntity>> {
    const  foundServices = await  this.serviceRepository.getServices();
    return foundServices;
  }

  async findOne(id: number):Promise<ServiceEntity> {
    const foundService = await this.serviceRepository.getServiceById(id);
    if (!foundService) {
      throw new ServiceNotFoundException();
    }
    return foundService;
  }

  async update(id: number, updateServiceDto: IUpdateServiceData):Promise<ServiceEntity> {
    const foundService = await this.findOne(id);
    foundService.parkId = updateServiceDto.parkId;
    foundService.userId = updateServiceDto.userId;
    foundService.startedAt = updateServiceDto.startedAt;
    foundService.endedAt = updateServiceDto.endedAt;
    foundService.price = updateServiceDto.price;
    foundService.tariffId = updateServiceDto.tariffId;
    const updated = await this.serviceRepository.updateService(foundService);
    return updated;
  }

  async remove(entity: ServiceEntity):Promise<ServiceEntity> {
    const deleted = await this.serviceRepository.deleteService(entity)
    return deleted;
  }
}
