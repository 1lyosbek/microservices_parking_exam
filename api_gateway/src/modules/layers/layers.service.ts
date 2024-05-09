import { Inject, Injectable } from '@nestjs/common';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { PARK_PACKAGE } from 'src/common/consts/consts';
import { ClientGrpc } from '@nestjs/microservices';
import { ParksService } from '../parks/parks.service';

@Injectable()
export class LayersService {

  private layerService: any;

  constructor(
    @Inject(PARK_PACKAGE) private layerclient: ClientGrpc,
    private parkService: ParksService
  ) { }

  onModuleInit() {
    this.layerService = this.layerclient.getService<any>('LayerService');
  }
  async create(createLayerDto: CreateLayerDto) {
    await this.parkService.findOneById(createLayerDto.parkId);
    const createdLayer = await this.layerService.create(createLayerDto);
    return createdLayer;
  }

  async findAll() {
    const foundLayers = await this.layerService.findAll() ;
    return foundLayers;
  }

  async findOne(id: number) {
    const foundLayer = await this.layerService.findOneById({id});
    return foundLayer;
  }

  async update(id: number, updateLayerDto: UpdateLayerDto) {
    await this.parkService.findOneById(id);
    const updatedLayer = await this.layerService.update({id, data: updateLayerDto});
    return updatedLayer;
  }

  async remove(id: number) {
    const deletedLayer = await this.layerService.delete({id});
    return deletedLayer;
  }
}
