import { Module } from '@nestjs/common';
import { ParksService } from './parks.service';
import { ParksController } from './parks.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE } from 'src/common/consts/consts';
import { join } from 'path';
import { config } from 'src/common/config/config';
console.log(join(__dirname, '../../protos/park.proto'));

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'park',
          protoPath: join(__dirname, '../../protos/park.proto'),
          url: config.parkServerUrl
        },
      },
    ]),
  ],
  controllers: [ParksController],
  providers: [ParksService],
})
export class ParksModule { }
