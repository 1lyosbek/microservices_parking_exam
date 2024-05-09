import { Module } from '@nestjs/common';
import { TariffsService } from './tariffs.service';
import { TariffsController } from './tariffs.controller';
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
          package: ['park', 'tariff'] ,
          protoPath: [
            join(__dirname, '../../protos/park.proto'),
            join(__dirname, '../../protos/tariff.proto')
          ],
          url: config.parkServerUrl
        },
      },
    ]),
  ],
  controllers: [TariffsController],
  providers: [TariffsService, ParksService],
})
export class TariffsModule {}
