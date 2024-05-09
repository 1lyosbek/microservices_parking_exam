import { Controller, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ShotService } from './shot.service';
import { CreateShotDto } from './dto/create-shot.dto';
import { AllExceptionsFilter } from 'src/lib/rpc-exeptionFilter';
import { ResData } from 'src/lib/resData';
import { SHOT_SERVICE } from 'src/common/consts/consts';
import { IShotById, IShotByUserId, IShotUpdateDto } from './interfaces/shot.contr.interface';
import { ShotEntity } from './entities/shot.entity';

@Controller()
export class ShotController {
  constructor(private readonly shotService: ShotService) {}
  
  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod(SHOT_SERVICE, 'FindOneById')
  async findOne(data: IShotById) {
    const shotById = await this.shotService.findOne(data.id)
    return new ResData("shot found", 200, shotById)
  }
  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod(SHOT_SERVICE, 'FindOneByUserId')
  async findOneByUserid(data: IShotByUserId) {
    const shotByUserId = await this.shotService.findShotByUserId(data.userId)
    return new ResData("shot found by user Id", 200, shotByUserId)
  }

  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod(SHOT_SERVICE, 'FindAll')
  async findAll(data: {}) {
    const allAvailableShots = await this.shotService.findAll();
    const repeated: { shots: ShotEntity[] } = { shots: allAvailableShots };
    const resData = new ResData<{ shots: Array<ShotEntity> }>("all shots", 200, repeated);
    return resData
  }

  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod(SHOT_SERVICE, 'Create')
  async create(data: CreateShotDto) {
    const created = await this.shotService.create(data);
    return new ResData("shot created successfully", 201, created);
  }
  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod(SHOT_SERVICE, 'Update')
  async update(data: IShotUpdateDto) {
    const updated = await this.shotService.update(data.id, data.data);
    return new ResData("shot updated successfully", 200, updated);
  }
  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod(SHOT_SERVICE, 'Delete')
  async delete(data: IShotById) {
    const foundShot = await this.shotService.findOne(data.id);
    const deleted = await this.shotService.remove(foundShot);
    return new ResData("shot deleted successfully", 200, deleted);
  }
}
