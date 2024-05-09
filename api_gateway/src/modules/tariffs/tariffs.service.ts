import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { PARK_PACKAGE, TARIFF_SERVICE } from 'src/common/consts/consts';
import { ParksService } from '../parks/parks.service';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class TariffsService implements OnModuleInit {
  private tariffService: any;

  constructor(
    @Inject(PARK_PACKAGE) private client: ClientGrpc,
    private readonly parkService: ParksService
  ) { }

  onModuleInit() {
    this.tariffService = this.client.getService<any>(TARIFF_SERVICE);
  }
  async create(createTariffDto: CreateTariffDto) {
    await this.parkService.findOneById(createTariffDto.parkId);
    const createdTariff = await this.tariffService.create(createTariffDto).toPromise();
    return createdTariff;
  }

  async findAll() {
    const foundTariffs = await this.tariffService.findAll({}).toPromise();
    return foundTariffs;
  }

  async findOne(id: number) {
    const foundTariff = await this.tariffService.findOneById({id}).toPromise();
    return foundTariff;
  }

  async update(id: number, updateTariffDto: UpdateTariffDto) {
    await this.parkService.findOneById(updateTariffDto.parkId);
    const updatedTariff = await this.tariffService.update({id, data: updateTariffDto}).toPromise();
    return updatedTariff;
  }

  async remove(id: number) {
    const deletedTariff = await this.tariffService.delete({id}).toPromise();
    return deletedTariff;
  }
}
