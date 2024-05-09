import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LayerService } from './layer.service';
import { CreateLayerDto } from './dto/create-layer.dto';
import { ResData } from 'src/lib/resData';
import { ILayerById, ILayerUpdateDto } from './interfaces/layer.contr.interface';
import { LayerEntity } from './entities/layer.entity';

@Controller()
export class LayerController {
  constructor(private readonly layerService: LayerService) {}

  @GrpcMethod('LayerService', 'FindOneById')
  async findOne(data: ILayerById) {
    const layerById = await this.layerService.findOneById(data.id)
    return new ResData("layer found", 200, layerById)
  }

  @GrpcMethod('LayerService', 'FindAll')
  async findAll(data: {}) {
    const allAvailableLayers = await this.layerService.findAll();
    const repeated: { layers: LayerEntity[] } = { layers: allAvailableLayers };
    const resData = new ResData<{ layers: Array<LayerEntity> }>("all available layers", 200, repeated);
    return resData
  }

  @GrpcMethod('LayerService', 'Create')
  async create(data: CreateLayerDto) {
    const created = await this.layerService.create(data);
    return new ResData("layer created successfully", 201, created);
  }
  @GrpcMethod('LayerService', 'Update')
  async update(data: ILayerUpdateDto) {
    const updated = await this.layerService.update(data.id, data.data);
    return new ResData("layer updated successfully", 200, updated);
  }
  @GrpcMethod('LayerService', 'Delete')
  async delete(data: ILayerById) {
    const foundUser = await this.layerService.findOneById(data.id);
    const deleted = await this.layerService.remove(foundUser);
    return new ResData("layer deleted successfully", 200, deleted);
  }
}
