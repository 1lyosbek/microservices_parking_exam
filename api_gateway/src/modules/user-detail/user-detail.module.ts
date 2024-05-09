import { Module } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { UserDetailController } from './user-detail.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE, USER_PACKAGE } from 'src/common/consts/consts';
import { join } from 'path';
import { UserService } from '../users/users.service';
import { ParksService } from '../parks/parks.service';
import { config } from 'src/common/config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
      name: USER_PACKAGE,
      transport: Transport.GRPC,
      options: {
        package: ['userdetail', 'user'],
        protoPath: [
          join(__dirname, '../../protos/user-detail.proto'),
          join(__dirname, '../../protos/user.proto')
        ],
        url: config.userServerUrl,
      },
    },
      {
      name: PARK_PACKAGE,
      transport: Transport.GRPC,
      options: {
        package: 'park',
        protoPath: join(__dirname, '../../protos/park.proto'),
        url: config.parkServerUrl,
      },
    },
  ])
  ],
  controllers: [UserDetailController],
  providers: [UserDetailService, UserService, ParksService],
})
export class UserDetailModule {}
