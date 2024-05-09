import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { IUserDetailRepository } from './interfaces/user-detail.repo.interface';
import { UserDetailEntity } from './entities/user-detail.entity';
import { UserDetailNotFound } from './exceptions/user-detail.exceptions';
import { IUserDetailUpdataData } from './interfaces/user-detail.contr.interface';

@Injectable()
export class UserDetailService {
  constructor(@Inject("IUserDetailRepository") private readonly userDetailRepository: IUserDetailRepository) {}
    
  
  async create(createUserDetailDto: CreateUserDetailDto):Promise<UserDetailEntity> {
    const newUserDetail = new UserDetailEntity();
    newUserDetail.firstName = createUserDetailDto.firstName;
    newUserDetail.lastName = createUserDetailDto.lastName;
    newUserDetail.avatar = createUserDetailDto.avatar;
    newUserDetail.userId = createUserDetailDto.userId;
    const created = await this.userDetailRepository.createUserDetail(newUserDetail);
    return created;
  }

  async findAll(): Promise<Array<UserDetailEntity>> {
    const foundUserDetails = await this.userDetailRepository.getUserDetails();
    return foundUserDetails;
  }

  async findOne(id: number):Promise<UserDetailEntity> {
    const foundUserDetail = await this.userDetailRepository.getUserDetailById(id);
    if (!foundUserDetail) {
      throw new UserDetailNotFound();
    }
    return foundUserDetail;
  }

  async update(id: number, updateUserDetailDto: IUserDetailUpdataData):Promise<UserDetailEntity> {
    const foundUserDetail = await this.findOne(id);
    foundUserDetail.firstName = updateUserDetailDto.firstName;
    foundUserDetail.lastName = updateUserDetailDto.lastName;
    foundUserDetail.avatar = updateUserDetailDto.avatar;
    foundUserDetail.userId = updateUserDetailDto.user_id;
    const updated = await this.userDetailRepository.updateUserDetail(foundUserDetail);
    return updated;
  }

  async remove(entity: UserDetailEntity):Promise<UserDetailEntity> {
    const deleted = await this.userDetailRepository.deleteUserDetail(entity);
    return deleted;
  }
}
