import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { PARK_PACKAGE, USER_PACKAGE } from 'src/common/consts/consts';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ParksService } from '../parks/parks.service';
import { config } from 'src/common/config/config';

@Module({
  imports: [
    ClientsModule.register([
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
  controllers: [UsersController],
  providers: [UserService, ParksService],
})
export class UsersModule {}
