import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE } from 'src/common/consts/consts';
import { join } from 'path';
import { config } from 'src/common/config/config';
import { LayersService } from '../layers/layers.service';
import { ParksService } from '../parks/parks.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['place', 'layer', 'park'],
          protoPath: [
            join(__dirname, '../../protos/place.proto'),
            join(__dirname, '../../protos/layer.proto'),
            join(__dirname, '../../protos/park.proto')
          ],
          url: config.parkServerUrl
        },
      },
    ]),
  ],
  controllers: [PlacesController],
  providers: [PlacesService, LayersService, ParksService],
})
export class PlacesModule {}
