import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { USER_DETAIL_SERVICE, USER_PACKAGE } from 'src/common/consts/consts';
import { ClientGrpc } from '@nestjs/microservices';
import { UserService } from '../users/users.service';

@Injectable()
export class UserDetailService {
  private userDetailService: any;

  constructor(
    @Inject(USER_PACKAGE) private client: ClientGrpc,
    private readonly userService: UserService,
  ) { }

  onModuleInit() {
    this.userDetailService = this.client.getService<any>(USER_DETAIL_SERVICE);
  }
  async create(createUserDetailDto: CreateUserDetailDto) {
    await this.userService.findOne(createUserDetailDto.userId);
    const createUserDetail = await this.userDetailService.create(createUserDetailDto).toPromise();
    return createUserDetail;
  }

  async findAll() {
    const foundUserDetails = await this.userDetailService.findAll().toPromise();
    return foundUserDetails;
  }

  async findOne(id: number) {
    const foundUserDetail = await this.userDetailService.findOne(id).toPromise();
    return foundUserDetail;
  }

  async update(id: number, updateUserDetailDto: UpdateUserDetailDto) {
    await this.userService.findOne(updateUserDetailDto.userId);
    const updatedUserDetail = await this.userDetailService.update({id, data: updateUserDetailDto}).toPromise();
    return updatedUserDetail;
  }

  async remove(id: number) {
    const deletedUserDetail = await this.userDetailService.delete({id}).toPromise();
    return deletedUserDetail;
  }
}
