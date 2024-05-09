import { Module } from '@nestjs/common';
import { ShotService } from './shot.service';
import { ShotController } from './shot.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE, TRANSACTION_PACKAGE, USER_PACKAGE } from 'src/common/consts/consts';
import { join } from 'path';
import { UserService } from '../users/users.service';
import { ParksService } from '../parks/parks.service';
import { config } from 'src/common/config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TRANSACTION_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'shot',
          protoPath: join(__dirname, '../../protos/shot.proto'),
          url: config.transactionServerUrl
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
  controllers: [ShotController],
  providers: [ShotService, UserService, ParksService],
})
export class ShotModule {}
