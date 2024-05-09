import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PARK_PACKAGE, PLACE_SERVICE } from 'src/common/consts/consts';
import { ClientGrpc } from '@nestjs/microservices';
import { LayersService } from '../layers/layers.service';

@Injectable()
export class PlacesService implements OnModuleInit{

  private placeService: any;

  constructor(
    @Inject(PARK_PACKAGE) private client: ClientGrpc,
    private readonly layerService: LayersService
  ) {}

  onModuleInit() {
    this.placeService = this.client.getService<any>(PLACE_SERVICE);
  }
  async create(createPlaceDto: CreatePlaceDto) {
    await this.layerService.findOne(createPlaceDto.layerId); 
    const created = await this.placeService.create(createPlaceDto).toPromise(); 
    return created;
  }

  async findAll() {
    const foundPlaces = await this.placeService.findAll().toPromise();
    return foundPlaces;
  }

  async findOne(id: number) {
    const foundPlace = await this.placeService.findOne(id).toPromise();
    return foundPlace;
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto) {
    await this.layerService.findOne(updatePlaceDto.layerId); 
    const updated = await this.placeService.update({id, data: updatePlaceDto}).toPromise();
    return updated;
  }

  async remove(id: number) {
    const deleted = await this.placeService.delete({id}).toPromise();
    return deleted;
  }
}
