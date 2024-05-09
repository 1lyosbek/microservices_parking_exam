import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserRepository } from './interfaces/users.repo.interface';
import { UserEntity } from './entities/user.entity';
import { UserNotFoundException } from './exceptions/user.exceptions';
import { IUserUpdateData } from './interfaces/users.contr.interface';

@Injectable()
export class UsersService {
  constructor(@Inject("IUserRepository") private readonly useRepository: IUserRepository) {}
  async create(createUserDto: CreateUserDto):Promise<UserEntity> {
    const newUser = new UserEntity(); 
    newUser.phone = createUserDto.phone;
    newUser.password =  createUserDto.password;
    newUser.role = createUserDto.role;
    newUser.parkId = createUserDto.parkId;
    const created  = await this.useRepository.createUser(newUser);
    return  created;
  }

  async findAll():Promise<Array<UserEntity>> {
    const foundUsers = await this.useRepository.getUsers();
    return foundUsers;
  }

  async findByPhone(phone: string):Promise<UserEntity | null>{
    const foundUser = await this.useRepository.getUserByPhone(phone);
    return foundUser;
  }

  async findOne(id: number):Promise<UserEntity> {
    const foundUser = await this.useRepository.getUserById(id);
    if (!foundUser) {
      throw new UserNotFoundException();
    }
    return foundUser;
  }

  async update(id: number, updateUserDto: IUserUpdateData):Promise<UserEntity> {
    const foundUser = await this.findOne(id);
    foundUser.phone = updateUserDto.phone;
    foundUser.password =  updateUserDto.password;
    foundUser.role = updateUserDto.role;
    foundUser.parkId = updateUserDto.parkId;
    const updated = await this.useRepository.updateUser(foundUser);
    return updated;
  }

  async remove(entity: UserEntity):Promise<UserEntity> {
    const deleted = await this.useRepository.deleteUser(entity);
    return deleted;
  }
}
