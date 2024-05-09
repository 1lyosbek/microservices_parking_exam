import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { IPlaceById, IPlaceUpdatedDto } from './interfaces/place.contr.interface';
import { ResData } from 'src/lib/resData';
import { PlaceEntity } from './entities/place.entity';

@Controller()
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @GrpcMethod('PlaceService', 'FindOneById')
  async findOne(data: IPlaceById) {
    const placeById = await this.placeService.findOne(data.id)
    return new ResData("place found", 200, placeById)
  }

  @GrpcMethod('PlaceService', 'FindAll')
  async findAll(data: {}) {
    const allAvailablePlaces = await this.placeService.findAll();
    const repeated: { places: PlaceEntity[] } = { places: allAvailablePlaces };
    const resData = new ResData<{ places: Array<PlaceEntity> }>("all available places", 200, repeated);
    return resData
  }

  @GrpcMethod('PlaceService', 'Create')
  async create(data: CreatePlaceDto) {
    const created = await this.placeService.create(data);
    return new ResData("place created successfully", 201, created);
  }
  @GrpcMethod('PlaceService', 'Update')
  async update(data: IPlaceUpdatedDto) {
    const updated = await this.placeService.update(data.id, data.data);
    return new ResData("place updated successfully", 200, updated);
  }
  @GrpcMethod('PlaceService', 'Delete')
  async delete(data: IPlaceById) {
    const foundUser = await this.placeService.findOne(data.id);
    const deleted = await this.placeService.remove(foundUser);
    return new ResData("place deleted successfully", 200, deleted);
  }
}
