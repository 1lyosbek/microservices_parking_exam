import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { UserDetailModule } from './modules/user-detail/user-detail.module';
import { UserTariffModule } from './modules/user-tariff/user-tariff.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionSource } from './common/config/database.config';

@Module({
  imports: [ TypeOrmModule.forRoot(connectionSource),UsersModule, UserDetailModule, UserTariffModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
