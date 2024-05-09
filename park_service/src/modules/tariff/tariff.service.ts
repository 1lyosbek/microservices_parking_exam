import { Inject, Injectable } from '@nestjs/common';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { ITariffRepository } from './interfaces/tariff.repo.interface';
import { TariffEntity } from './entities/tariff.entity';
import { TariffNotFoundException } from './exceptions/tariff.exceptions';
import { IUpadateTariffData } from './interfaces/tariff.contr.interface';

@Injectable()
export class TariffService {
  constructor(@Inject("ITariffRepository") private readonly tariffRepository: ITariffRepository) {}
  async create(createTariffDto: CreateTariffDto):Promise<TariffEntity> {
    const newTariff = new TariffEntity();
    newTariff.name = createTariffDto.name;
    newTariff.parkId = createTariffDto.parkId;
    newTariff.price = createTariffDto.price;
    newTariff.time = createTariffDto.time;
    const created = await this.tariffRepository.createTariff(newTariff);
    return created;
  }

  async findAll():Promise<TariffEntity[]> {
    const foundTariffs = await this.tariffRepository.getTariffs();
    return foundTariffs;
  }

  async findOne(id: number):Promise<TariffEntity> {
    const foundTariff = await this.tariffRepository.getTariffById(id);
    if (!foundTariff) {
      throw new TariffNotFoundException();
    }
    return foundTariff;
  }

  async update(id: number, updateTariffDto: IUpadateTariffData):Promise<TariffEntity> {
    const foundTariff = await this.findOne(id);
    foundTariff.name = updateTariffDto.name;
    foundTariff.parkId = updateTariffDto.parkId;
    foundTariff.price = updateTariffDto.price;
    foundTariff.time = updateTariffDto.time;
    const updated = await this.tariffRepository.updateTariff(foundTariff);
    return updated;
  }

  async remove(entity: TariffEntity):Promise<TariffEntity> {
    const deleted = await this.tariffRepository.deleteTariff(entity);
    return deleted;
  }
}
