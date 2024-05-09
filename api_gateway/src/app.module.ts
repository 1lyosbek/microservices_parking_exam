import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ParksModule } from './modules/parks/parks.module';
import { FilesModule } from './modules/files/files.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { LayersModule } from './modules/layers/layers.module';
import { ServicesModule } from './modules/services/services.module';
import { PlacesModule } from './modules/places/places.module';
import { TariffsModule } from './modules/tariffs/tariffs.module';
import { UserTariffModule } from './modules/user-tariff/user-tariff.module';
import { UserDetailModule } from './modules/user-detail/user-detail.module';
import { ShotModule } from './modules/shot/shot.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
      serveRoot: '/upload',
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: { host: 'localhost', port: 6379 },
          ttl: 10 * 1000,
        });
        return { store }
      },
    }), UsersModule, ParksModule, FilesModule, TransactionsModule, LayersModule, ServicesModule, PlacesModule, TariffsModule, UserTariffModule, UserDetailModule, ShotModule, ShotModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
