import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';
import { UserService } from '../users/users.service';
import { ClientGrpc } from '@nestjs/microservices';
import { SHOT_SERVICE, TRANSACTION_PACKAGE } from 'src/common/consts/consts';

@Injectable()
export class ShotService implements OnModuleInit {

  private shotService: any;

  constructor(
    @Inject(TRANSACTION_PACKAGE) private client: ClientGrpc,
    private readonly userService: UserService
  ) { }

  onModuleInit() {
    this.shotService = this.client.getService<any>(SHOT_SERVICE);
  }
  async create(createShotDto: CreateShotDto) {
    await this.userService.findOne(createShotDto.userId);
    const createdShot = await this.shotService.create(createShotDto).toPromise();
    return createdShot;
  }

  async findAll() {
    const foundShots = await this.shotService.findAll({}).toPromise();
    return foundShots;
  }

  async  findShotByUserId(userId: number){
    console.log(userId);
    const foundShot = await this.shotService.findOneByUserId({userId}).toPromise();
    return foundShot;
  }

  async findOne(id: number) {
    const foundShot = await this.shotService.findOne({id}).toPromise();
    return foundShot;
  }

  async update(id: number, updateShotDto: UpdateShotDto) {
    await this.userService.findOne(updateShotDto.userId);
    const updatedShot = await this.shotService.update({id, data: updateShotDto}).toPromise();
    return updatedShot;
  }

  async remove(id: number) {
    const deletedShot = await this.shotService.delete({id}).toPromise();
    return deletedShot;
  }
}
