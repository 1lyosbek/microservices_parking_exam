import { Module } from '@nestjs/common';
import { LayerService } from './layer.service';
import { LayerController } from './layer.controller';
import { LayerEntity } from './entities/layer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LayerRepository } from './layer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LayerEntity])],
  controllers: [LayerController],
  providers: [LayerService, {provide: "ILayerRepository", useClass: LayerRepository}],
})
export class LayerModule {}
