import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PARK_PACKAGE, SERVICE_SERVICE } from 'src/common/consts/consts';
import { ParksService } from '../parks/parks.service';
import { ClientGrpc } from '@nestjs/microservices';
import { UserService } from '../users/users.service';

@Injectable()
export class ServicesService implements OnModuleInit {

  private serviceService: any;

  constructor(
    @Inject(PARK_PACKAGE) private client: ClientGrpc,
    private readonly parkService: ParksService,
    private readonly userService: UserService
  ) { }

  onModuleInit() {
    this.serviceService = this.client.getService<any>(SERVICE_SERVICE);
  }
  async create(createServiceDto: CreateServiceDto) {
    await this.parkService.findOneById(createServiceDto.parkId);
    await this.userService.findOne(createServiceDto.userId);
    const created = await this.serviceService.create(createServiceDto).toPromise();
    return created;
  }

  async findAll() {
    const foundServices = await this.serviceService.findAll().toPromise();
    return foundServices;
  }

  async findOne(id: number) {
    const foundService = await this.serviceService.findOne(id).toPromise();
    return foundService;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    await this.parkService.findOneById(updateServiceDto.parkId);
    await this.userService.findOne(updateServiceDto.userId);
    const updated = await this.serviceService.update(id, updateServiceDto).toPromise(); 
    return updated;
  }

  async remove(id: number) {
    const deleted = await this.serviceService.delete(id).toPromise();
    return deleted;
  }
}
