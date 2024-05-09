import { Inject, Injectable } from '@nestjs/common';
import { CreateShotDto } from './dto/create-shot.dto';
import { IShotRepository } from './interfaces/shot.repo.interface';
import { ShotEntity } from './entities/shot.entity';
import { ShotNotFoundException } from './exceptions/shot.exceptions';
import { IShotUpdateData } from './interfaces/shot.contr.interface';

@Injectable()
export class ShotService {
  constructor(@Inject("IShotRepository") private readonly shotRepository: IShotRepository) {}
  async create(createShotDto: CreateShotDto):Promise<ShotEntity> {
    const newShot = new ShotEntity();
    newShot.userId = createShotDto.userId;
    newShot.amount = createShotDto.amount;
    const created = await this.shotRepository.createShot(newShot);
    return created;
  }

  async findAll():Promise<Array<ShotEntity>> {
    const foundShots = await this.shotRepository.getShots();
    return foundShots;
  }

  async findOne(id: number):Promise<ShotEntity> {
    const foundShot = await this.shotRepository.getShotById(id);
    if (!foundShot) {
      throw new ShotNotFoundException();
    }
    return foundShot;
  }

  async findShotByUserId(userId: number):Promise<ShotEntity> {
    const foundShot = await this.shotRepository.getShotByUserId(userId);
    if (!foundShot) {
      throw new ShotNotFoundException();
    }
    return foundShot;
  }

  async update(id: number, updateShotDto: IShotUpdateData):Promise<ShotEntity> {
    const foundShot = await this.findOne(id);
    foundShot.userId = updateShotDto.userId;
    foundShot.amount = updateShotDto.amount;
    const updated = await this.shotRepository.updateShot(foundShot);
    return updated;
  }

  async remove(entity: ShotEntity):Promise<ShotEntity> {
    const deleted = await this.shotRepository.deleteShot(entity);
    return deleted;
  }
}
