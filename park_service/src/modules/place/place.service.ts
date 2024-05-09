import { Inject, Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { IPlaceRepository } from './interfaces/place.repo.intreface';
import { PlaceEntity } from './entities/place.entity';
import { PlaceNotFoundException } from './exceptions/place.exception';
import { IUpdateDto } from './interfaces/place.contr.interface';

@Injectable()
export class PlaceService {
  constructor(@Inject("IPlaceRepository") private readonly placeRepository: IPlaceRepository) {}
  async create(createPlaceDto: CreatePlaceDto) {
    const newPlace = new PlaceEntity();
    newPlace.name = createPlaceDto.name;
    newPlace.layerId = createPlaceDto.layerId;
    newPlace.price = createPlaceDto.price;
    const created = await this.placeRepository.createPlace(newPlace);
    return created;
  }

  async findAll():Promise<Array<PlaceEntity>> {
    const foundPlaces = await this.placeRepository.getPlaces();
    return foundPlaces;
  }

  async findOne(id: number):Promise<PlaceEntity> {
    const foundPlace = await this.placeRepository.getPlaceById(id);
    if (!foundPlace) {
      throw new PlaceNotFoundException()
    }
    return foundPlace;
  }

  async update(id: number, updatePlaceDto: IUpdateDto): Promise<PlaceEntity> {
    const foundPlace = await this.findOne(id);
    foundPlace.name = updatePlaceDto.name;
    foundPlace.layerId = updatePlaceDto.layerId;
    foundPlace.price = updatePlaceDto.price;
    const updated = await this.placeRepository.updatePlace(foundPlace);
    return updated;
  }

  async remove(entity: PlaceEntity):Promise<PlaceEntity> {
    const deleted = await this.placeRepository.deletePlace(entity)
    return deleted;
  }
}
