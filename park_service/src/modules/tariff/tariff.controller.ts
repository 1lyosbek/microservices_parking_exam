import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TariffService } from './tariff.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { ResData } from 'src/lib/resData';
import { TariffEntity } from './entities/tariff.entity';
import { ITariffById, IUpdateTariffDto } from './interfaces/tariff.contr.interface';

@Controller()
export class TariffController {
  constructor(private readonly tariffService: TariffService) {}

  @GrpcMethod('TariffService', 'FindOneById')
  async findOne(data: ITariffById) {
    console.log(data);
    const placeById = await this.tariffService.findOne(data.id)
    return new ResData("place found", 200, placeById)
  }

  @GrpcMethod('TariffService', 'FindAll')
  async findAll(data: {}) {
    const allAvailableTariffs = await this.tariffService.findAll();
    const repeated: { tariffs: TariffEntity[] } = { tariffs: allAvailableTariffs };
    const resData = new ResData<{ tariffs: Array<TariffEntity> }>("all available tariffs", 200, repeated);
    return resData
  }

  @GrpcMethod('TariffService', 'Create')
  async create(data: CreateTariffDto) {
    const created = await this.tariffService.create(data);
    return new ResData("created tariff", 201, created);
  }
  @GrpcMethod('TariffService', 'Update')
  async update(data: IUpdateTariffDto) {
    const updated = await this.tariffService.update(data.id, data.data);
    return new ResData("tariff updated successfully", 200, updated);
  }
  @GrpcMethod('TariffService', 'Delete')
  async delete(data: ITariffById) {
    const foundUser = await this.tariffService.findOne(data.id);
    const deleted = await this.tariffService.remove(foundUser);
    return new ResData("tariff deleted successfully", 200, deleted);
  }
}
