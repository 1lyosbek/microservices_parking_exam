import { Module } from '@nestjs/common';
import { UserTariffService } from './user-tariff.service';
import { UserTariffController } from './user-tariff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTariffEntity } from './entities/user-tariff.entity';
import { UserTariffRepository } from './user-tariff.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserTariffEntity])],
  controllers: [UserTariffController],
  providers: [UserTariffService, { provide: "IUserTariffRepository", useClass: UserTariffRepository}],
})
export class UserTariffModule {}
