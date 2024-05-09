import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { config } from './common/config/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: ['userdetail', 'usertariff', 'user'],
      protoPath: [
        join(__dirname, './protos/user-detail.proto'),
        join(__dirname, './protos/user-tariff.proto'),
        join(__dirname, './protos/user.proto'),
      ],
      url: config.port,
    },
  });
  app.listen();
}
bootstrap();