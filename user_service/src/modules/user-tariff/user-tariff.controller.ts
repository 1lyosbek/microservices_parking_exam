import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserTariffService } from './user-tariff.service';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { USER_TARIFF_SERVICE } from 'src/common/consts/consts';
import { IUpdateUserTariffDto, IUserTariffById } from './interface/user-tariff.contr.interface';
import { ResData } from 'src/lib/resData';
import { UserTariffEntity } from './entities/user-tariff.entity';

@Controller()
export class UserTariffController {
  constructor(private readonly userTariffService: UserTariffService) {}


  @GrpcMethod(USER_TARIFF_SERVICE, 'FindOneById')
  async findOne(data: IUserTariffById) {
    const userDetailById = await this.userTariffService.findOne(data.id);
    return new ResData("user-tariff found", 200, userDetailById)
  }

  @GrpcMethod(USER_TARIFF_SERVICE, 'FindAll')
  async findAll() {
    const allAvailableUserTariffs = await this.userTariffService.findAll();
    const repeated: { userTariffs: UserTariffEntity[] } = { userTariffs: allAvailableUserTariffs };
    const resData = new ResData<{ userTariffs: Array<UserTariffEntity> }>("all available users tariffs", 200, repeated);
    return resData
  }

  @GrpcMethod(USER_TARIFF_SERVICE, 'Create')
  async create(data: CreateUserTariffDto) {
    const created = await this.userTariffService.create(data);
    return new ResData("user tariff created successfully", 201, created);
  }
  @GrpcMethod(USER_TARIFF_SERVICE, 'Update')
  async update(data: IUpdateUserTariffDto) {
    const updated = await this.userTariffService.update(data.id, data.data);
    return new ResData("user tariff updated successfully", 200, updated);
  }
  @GrpcMethod(USER_TARIFF_SERVICE, 'Delete')
  async delete(data: IUserTariffById) {
    const foundUserTariff = await this.userTariffService.findOne(data.id);
    const deleted = await this.userTariffService.remove(foundUserTariff);
    return new ResData("user tariff deleted successfully", 200, deleted);
  }
}
