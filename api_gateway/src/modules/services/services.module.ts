import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE, USER_PACKAGE } from 'src/common/consts/consts';
import { join } from 'path';
import { ParksService } from '../parks/parks.service';
import { UserService } from '../users/users.service';
import { config } from 'src/common/config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['service', 'park'],
          protoPath: [
            join(__dirname, '../../protos/service.proto'),
            join(__dirname, '../../protos/park.proto')
          ],
          url: config.parkServerUrl
        },
      },
      {
        name: USER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../../protos/user.proto'),
          url: config.userServerUrl
        },
      },
    ]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService, ParksService, UserService],
})
export class ServicesModule {}
