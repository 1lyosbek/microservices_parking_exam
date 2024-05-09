import { Module } from '@nestjs/common';
import { ShotModule } from './modules/shot/shot.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionSource } from './common/config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(connectionSource), ShotModule, TransactionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
