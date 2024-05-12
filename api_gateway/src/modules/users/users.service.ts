import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_PACKAGE, USER_SERVICE } from 'src/common/consts/consts';
import { ClientGrpc } from '@nestjs/microservices';
import { ParksService } from '../parks/parks.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/enums/roleEnum';
import { Cache } from 'cache-manager';
import { AuthLoginDto } from '../auth/dto/create-auth.dto';

@Injectable()
export class UserService implements OnModuleInit {

  private userService: any;

  constructor(
    @Inject(USER_PACKAGE) private client: ClientGrpc,
    private readonly parkService: ParksService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  onModuleInit() {
    this.userService = this.client.getService<any>(USER_SERVICE);
  }

  async create(createUserDto: CreateUserDto) {
    await this.parkService.findOneById(createUserDto.parkId);
    const createdUser = await this.userService.create(createUserDto).toPromise();
    await this.cacheManager.del(RedisKeys.USERS)
    return createdUser;
  }

  async findAll() {
    const foundUsers = await this.userService.findAll({}).toPromise();
    return foundUsers;
  }
  async findOne(id: number) {
    const foundUser = await this.userService.findOneById({ id }).toPromise();
    return foundUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.parkService.findOneById(updateUserDto.parkId);
    const updatedUser = await this.userService.update({ id, data: updateUserDto }).toPromise();
    await this.cacheManager.del(RedisKeys.USERS)
    return updatedUser;
  }
  async login(data: AuthLoginDto) {
    const logged = await this.userService.login(data).toPromise();
    return logged;
  }

  async remove(id: number) {
    const deletedUser = await this.userService.delete({ id }).toPromise();
    await this.cacheManager.del(RedisKeys.USERS)
    return deletedUser;
  }
}
