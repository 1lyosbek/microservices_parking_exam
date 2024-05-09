import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserDetailService } from './user-detail.service';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { USER_DETAIL_SERVICE } from 'src/common/consts/consts';
import { IUserDetailById, IUserDetailUpdate } from './interfaces/user-detail.contr.interface';
import { ResData } from 'src/lib/resData';
import { UserDetailEntity } from './entities/user-detail.entity';

@Controller()
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}

  @GrpcMethod(USER_DETAIL_SERVICE, 'FindOneById')
  async findOne(data: IUserDetailById) {
    const userDetailById = await this.userDetailService.findOne(data.id);
    return new ResData("park found", 200, userDetailById)
  }

  @GrpcMethod(USER_DETAIL_SERVICE, 'FindAll')
  async findAll() {
    const allAvailableUserDetailts = await this.userDetailService.findAll();
    const repeated: { userDetailts: UserDetailEntity[] } = { userDetailts: allAvailableUserDetailts};
    const resData = new ResData<{ userDetailts: Array<UserDetailEntity> }>("all available users details", 200, repeated);
    return resData
  }

  @GrpcMethod(USER_DETAIL_SERVICE, 'Create')
  async create(data: CreateUserDetailDto) {
    const created = await this.userDetailService.create(data);
    return new ResData("user detail created successfully", 201, created);
  }
  @GrpcMethod(USER_DETAIL_SERVICE, 'Update')
  async update(data: IUserDetailUpdate) {
    const updated = await this.userDetailService.update(data.id, data.data);
    return new ResData("user detail updated successfully", 200, updated);
  }
  @GrpcMethod(USER_DETAIL_SERVICE, 'Delete')
  async delete(data: IUserDetailById) {
    const foundUserDetail = await this.userDetailService.findOne(data.id);
    const deleted = await this.userDetailService.remove(foundUserDetail);
    return new ResData("user deleted successfully", 200, deleted);
  }
}
