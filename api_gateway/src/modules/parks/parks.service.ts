import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { PARK_PACKAGE, PARK_SERVICE } from 'src/common/consts/consts';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/enums/roleEnum';
import { Cache } from 'cache-manager';

@Injectable()
export class ParksService implements OnModuleInit {

  private parkService: any;

  constructor(
    @Inject(PARK_PACKAGE) private client: ClientGrpc,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  onModuleInit() {
    this.parkService = this.client.getService<any>(PARK_SERVICE);
  }

  async create(createParkDto: CreateParkDto) {
    const created = await this.parkService.create(createParkDto).toPromise();
    await this.cacheManager.del(RedisKeys.PARKS)
    return created.data;
  }

  async findAll() {
    const response = await this.parkService.findAll({}).toPromise();
    return response;
  }

  async findOneById(id: number) {
    const foundPark = await this.parkService.findOneById({ id }).toPromise();
    return foundPark;
  }

  async update(id: number, updateParkDto: UpdateParkDto) {
    const updated = await this.parkService.Update({ id, data: updateParkDto }).toPromise();
    await this.cacheManager.del(RedisKeys.PARKS)
    return updated;
  }

  async remove(id: number) {
    const deleted = await this.parkService.Delete({ id }).toPromise();
    await this.cacheManager.del(RedisKeys.PARKS)
    return deleted;
  }
}
