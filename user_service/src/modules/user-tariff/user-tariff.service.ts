import { Inject, Injectable } from '@nestjs/common';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { UserTariffEntity } from './entities/user-tariff.entity';
import { IUserTariffRepository } from './interface/user-tariff.repo.interface';
import { UserTariffNotFound } from './exceptions/user-tariff.exceptions';
import { IUpdateUserTariffData } from './interface/user-tariff.contr.interface';

@Injectable()
export class UserTariffService {
  constructor(@Inject("IUserTariffRepository") private readonly userTariffRepository: IUserTariffRepository) {}
  
  async create(createUserTariffDto: CreateUserTariffDto):Promise<UserTariffEntity> {
    const newUserTariff = new UserTariffEntity();
    newUserTariff.userId = createUserTariffDto.userId;
    newUserTariff.tariffId = createUserTariffDto.tariffId;
    newUserTariff.startedAt = createUserTariffDto.startedAt;
    newUserTariff.endedAt = createUserTariffDto.endedAt;
    const created = await this.userTariffRepository.createUserTariff(newUserTariff);
    return created;
  }

  async findAll():Promise<Array<UserTariffEntity>> {
    const foundUserTariffs = await this.userTariffRepository.getUserTariffs();
    return foundUserTariffs;
  }

  async findOne(id: number):Promise<UserTariffEntity> {
    const foundUserTariff = await this.userTariffRepository.getUserTariffById(id);
    if (!foundUserTariff) {
      throw new UserTariffNotFound();
    }
    return foundUserTariff;
  }

  async update(id: number, updateUserTariffDto: IUpdateUserTariffData):Promise<UserTariffEntity> {
    const founfUserTariff = await this.findOne(id);
    founfUserTariff.userId = updateUserTariffDto.userId; 
    founfUserTariff.tariffId = updateUserTariffDto.tariffId;
    founfUserTariff.startedAt = updateUserTariffDto.startedAt;
    founfUserTariff.endedAt = updateUserTariffDto.endedAt;
    const updated = await this.userTariffRepository.updateUserTariff(founfUserTariff);
    return updated;
  }

  async remove(entity: UserTariffEntity):Promise<UserTariffEntity> {
    const deleted = await this.userTariffRepository.deleteUserTariff(entity);
    return deleted;
  }
}
