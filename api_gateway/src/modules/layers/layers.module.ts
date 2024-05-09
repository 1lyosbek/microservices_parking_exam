import { Module } from '@nestjs/common';
import { LayersService } from './layers.service';
import { LayersController } from './layers.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE } from 'src/common/consts/consts';
import { join } from 'path';
import { ParksService } from '../parks/parks.service';
import { config } from 'src/common/config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['layer', 'park', ],
          protoPath: [
            join(__dirname, '../../protos/layer.proto'),
            join(__dirname, '../../protos/park.proto')
          ],
          url: config.parkServerUrl
        },
      },
    ]),
  ],
  controllers: [LayersController],
  providers: [LayersService, ParksService],
})
export class LayersModule {}
