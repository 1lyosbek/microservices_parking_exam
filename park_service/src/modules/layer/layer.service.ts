import { Inject, Injectable } from '@nestjs/common';
import { CreateLayerDto } from './dto/create-layer.dto';
import { LayerEntity } from './entities/layer.entity';
import { ILayerRepository } from './interfaces/layer.repo.interface';
import { LayerNotFoundException, NameOrFloorMustBeRequired } from './exceptions/layer.exceptions';
import { IUpdateLayerDto } from './interfaces/layer.contr.interface';

@Injectable()
export class LayerService {
  constructor(@Inject("ILayerRepository") private readonly layerRepository: ILayerRepository) {}
  async create(createLayerDto: CreateLayerDto) {
    const newLayer = new LayerEntity()
    if (!(createLayerDto.name || createLayerDto.floor)) {
      throw new NameOrFloorMustBeRequired();
    }
    newLayer.name = createLayerDto.name;
    newLayer.floor = createLayerDto.floor; 
    newLayer.parkId = createLayerDto.parkId;
    const created = await this.layerRepository.createLayer(newLayer);
    return created;
  }

  async findAll() {
    const foundLayers = await this.layerRepository.getLayers(); 
    return foundLayers;
  }

  async findOneById(id: number) {
    const foundLayer = await this.layerRepository.getLayerById(id);
    if (!foundLayer) {
      throw new LayerNotFoundException();
    }
    return foundLayer;
  }

  async update(id: number, updateLayerDto: IUpdateLayerDto) {
    const foundLayer = await this.findOneById(id);
    foundLayer.name = updateLayerDto.name;
    foundLayer.floor = updateLayerDto.floor;
    foundLayer.parkId = updateLayerDto.parkId;
    const updated = await this.layerRepository.updateLayer(foundLayer);
    return updated;
  }

  async remove(entity: LayerEntity) {
    const deleted = await this.layerRepository.deleteLayer(entity);
    return deleted;
  }
}
