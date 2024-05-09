import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { ResData } from 'src/lib/resData';
import { IServiceById, IUpdateServiceDto } from './interfaces/service.contr.interface';
import { ServiceEntity } from './entities/service.entity';

@Controller()
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}
  @GrpcMethod('ServicesService', 'FindOneById')
  async findOne(data: IServiceById) {
    const serviceById = await this.serviceService.findOne(data.id)
    return new ResData("service found", 200, serviceById)
  }

  @GrpcMethod('ServicesService', 'FindAll')
  async findAll(data: {}) {
    const allAvailableServices = await this.serviceService.findAll();
    const repeated: { places: ServiceEntity[] } = { places: allAvailableServices };
    const resData = new ResData<{ places: Array<ServiceEntity> }>("all available services", 200, repeated);
    return resData
  }

  @GrpcMethod('ServicesService', 'Create')
  async create(data: CreateServiceDto) {
    const created = await this.serviceService.create(data);
    return new ResData("service created successfully", 201, created);
  }
  @GrpcMethod('ServicesService', 'Update')
  async update(data: IUpdateServiceDto) {
    const updated = await this.serviceService.update(data.id, data.data);
    return new ResData("service updated successfully", 200, updated);
  }
  @GrpcMethod('ServicesService', 'Delete')
  async delete(data: IServiceById) {
    const foundService = await this.serviceService.findOne(data.id);
    const deleted = await this.serviceService.remove(foundService);
    return new ResData("service deleted successfully", 200, deleted);
  }
}
