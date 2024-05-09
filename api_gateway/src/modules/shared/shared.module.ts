import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/common/config/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { USER_PACKAGE } from 'src/common/consts/consts';
import { UserService } from 'src/modules/users/users.service';

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
          }
        ]),
        JwtModule.register({
          global: true,
          secret: config.jwtKey,
          signOptions: { expiresIn: config.jwtExpiresIn },
        }),
      ],
    providers: [UserService, JwtStrategy],
    exports: [UserService, JwtStrategy]
})
export class SharedModule { }
