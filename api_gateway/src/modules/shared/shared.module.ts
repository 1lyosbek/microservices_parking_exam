import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/common/config/config';
import { JwtStrategy } from './guards/auth/jwt.strategy';
import { PARK_PACKAGE, USER_PACKAGE } from 'src/common/consts/consts';
import { UserService } from 'src/modules/users/users.service';
import { ParksService } from '../parks/parks.service';

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
          }
        ]),
        JwtModule.register({
          global: true,
          secret: config.jwtKey,
          signOptions: { expiresIn: config.jwtExpiresIn },
        }),
      ],
    providers: [UserService, JwtStrategy, ParksService],
    exports: [UserService, JwtStrategy]
})
export class SharedModule { }
