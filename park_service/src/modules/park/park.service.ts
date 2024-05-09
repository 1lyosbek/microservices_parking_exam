import { Inject, Injectable } from '@nestjs/common';
import { CreateParkDto } from './dto/create-park.dto';
import { ParkNotFoundException } from './exception/park.exception';
import { IParkRepository } from './interfaces/park.repo.interface';
import { ParkEntity } from './entities/park.entity';
import { IUpdateParkDto } from './interfaces/park.contr.interface';

@Injectable()
export class ParkService {
  constructor(@Inject('IParkRepository') private readonly parkRepository: IParkRepository) {}
  async create(createParkDto: CreateParkDto) {
    const newPark = new ParkEntity();
    newPark.name = createParkDto.name;
    newPark.owner = createParkDto.owner;
    newPark.image = createParkDto.image;
    const created = await this.parkRepository.createPark(newPark);
    return created;
  }

  async findAll():Promise<Array<ParkEntity>> {
    const allData = await this.parkRepository.getParks()
    return allData;
  }


  async findOne(id: number):Promise<ParkEntity> {
    const foundPark = await this.parkRepository.getParkById(id);
    if (!foundPark) {
      throw new ParkNotFoundException();
    }
    return foundPark;
  }

  async update(id: number, updateParkDto: IUpdateParkDto) {
    const foundPark = await this.findOne(id);
    console.log(foundPark);
    console.log(updateParkDto);
    foundPark.name = updateParkDto.name;
    foundPark.owner = updateParkDto.owner;
    foundPark.image = updateParkDto.image; 
    const updated = await this.parkRepository.updatePark(foundPark); 
    return updated;
  }

  async remove(entity: ParkEntity) {
    const deleted = await this.parkRepository.deletePark(entity);
    return deleted;
  }
}
