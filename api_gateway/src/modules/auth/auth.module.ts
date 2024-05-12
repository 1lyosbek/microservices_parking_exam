import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PARK_PACKAGE, USER_PACKAGE } from 'src/common/consts/consts';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { config } from 'src/common/config/config';
import { UserService } from '../users/users.service';
import { ParksService } from '../parks/parks.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['user'],
          protoPath: [
            join(__dirname, '../../protos/user.proto')
          ],
          url: config.userServerUrl,
        },
      },
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['park'],
          protoPath: [join(__dirname, '../../protos/park.proto')],
          url: config.parkServerUrl,
        },
      },
    ]), SharedModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, ParksService],
})
export class AuthModule {}
