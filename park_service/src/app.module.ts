import { Module } from '@nestjs/common';
import { PlaceModule } from './modules/place/place.module';
import { TariffModule } from './modules/tariff/tariff.module';
import { LayerModule } from './modules/layer/layer.module';
import { ParkModule } from './modules/park/park.module';
import { ServiceModule } from './modules/service/service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './common/config/config';
import { LayerEntity } from './modules/layer/entities/layer.entity';
import { ParkEntity } from './modules/park/entities/park.entity';
import { PlaceEntity } from './modules/place/entities/place.entity';
import { ServiceEntity } from './modules/service/entities/service.entity';
import { TariffEntity } from './modules/tariff/entities/tariff.entity';
import { connectionSource } from './common/config/database.config';


@Module({
  imports: [TypeOrmModule.forRoot(connectionSource),
    ServiceModule, LayerModule, ParkModule, TariffModule, PlaceModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
