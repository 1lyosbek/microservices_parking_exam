import { Controller, UseFilters } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { ParkService } from './park.service';
import { CreateParkDto } from './dto/create-park.dto';
import { IParkById, IParkUpdateDto } from './interfaces/park.contr.interface';
import { ResData } from 'src/lib/resData';
import { ParkEntity } from './entities/park.entity';
import { PARK_SERVICE } from 'src/common/consts/consts';
import { AllExceptionsFilter } from 'src/lib/rpc-exeptionFilter';

@Controller()
export class ParkController {
  constructor(private readonly parkService: ParkService) { }

  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod(PARK_SERVICE, 'FindOneById')
  async findOne(data: IParkById) {
    const parkById = await this.parkService.findOne(data.id);
    return new ResData("park found", 200, parkById)
  }

  @GrpcMethod(PARK_SERVICE, 'FindAll')
  async findAll() { 
    const allAvailableParks = await this.parkService.findAll();
    console.log(allAvailableParks);
    const repeated: { parks: ParkEntity[] } = { parks: allAvailableParks };
    const resData = new ResData<{ parks: Array<ParkEntity> }>("all available parks", 200, repeated);
    return resData
  }

  @GrpcMethod(PARK_SERVICE, 'Create')
  async create(data: CreateParkDto) {
    const created = await this.parkService.create(data);
    return new ResData("created park", 201, created);
  }
  @GrpcMethod(PARK_SERVICE, 'Update')
  async update(data: IParkUpdateDto) {
    const updated = await this.parkService.update(data.id, data.data);
    return new ResData("user updated successfully", 200, updated);
  }
  @GrpcMethod(PARK_SERVICE, 'Delete')
  async delete(data: IParkById) {
    const foundUser = await this.parkService.findOne(data.id);
    const deleted = await this.parkService.remove(foundUser);
    return new ResData("user deleted successfully", 200, deleted);
  }
}
