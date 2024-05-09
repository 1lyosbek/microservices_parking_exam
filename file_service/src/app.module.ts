import { Module } from '@nestjs/common';
import { FilesModule } from './modules/files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionSource } from './common/config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(connectionSource), FilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
