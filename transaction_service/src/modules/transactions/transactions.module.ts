import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionRepository } from './transactions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  controllers: [TransactionsController],
  providers: [TransactionsService, {provide: "ITransactionRepository", useClass: TransactionRepository}],
})
export class TransactionsModule {}
