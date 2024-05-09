import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE, TRANSACTION_PACKAGE, USER_PACKAGE } from 'src/common/consts/consts';
import { join } from 'path';
import { ShotService } from '../shot/shot.service';
import { ServicesService } from '../services/services.service';
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
  controllers: [TransactionsController],
  providers: [TransactionsService, ShotService, ServicesService, UserService, ParksService],
})
export class TransactionsModule {}
