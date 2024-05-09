import { Module } from '@nestjs/common';
import { UserTariffService } from './user-tariff.service';
import { UserTariffController } from './user-tariff.controller';
import { PARK_PACKAGE, TRANSACTION_PACKAGE, USER_PACKAGE } from 'src/common/consts/consts';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TransactionsService } from '../transactions/transactions.service';
import { ParksService } from '../parks/parks.service';
import { UserService } from '../users/users.service';
import { ShotService } from '../shot/shot.service';
import { ServicesService } from '../services/services.service';
import { TariffsService } from '../tariffs/tariffs.service';
import { config } from 'src/common/config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['usertariff', 'user'],
          protoPath: [
            join(__dirname, '../../protos/user-tariff.proto'),
            join(__dirname, '../../protos/user.proto')
          ],
          url: config.userServerUrl
        },
      },
      {
        name: TRANSACTION_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['transaction', 'shot'],
          protoPath: [
            join(__dirname, '../../protos/transaction.proto'),
            join(__dirname, '../../protos/shot.proto')
          ],
          url: config.transactionServerUrl
        },
      },
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['park', 'service', 'tariff'],
          protoPath: [
            join(__dirname, '../../protos/park.proto'),
            join(__dirname, '../../protos/service.proto'),
            join(__dirname, '../../protos/tariff.proto')
          ],
          url: config.parkServerUrl
        },
      },
    ]),
  ],
  controllers: [UserTariffController],
  providers: [UserTariffService, TransactionsService, ParksService, UserService, ShotService, ServicesService, TariffsService],
})
export class UserTariffModule {}
