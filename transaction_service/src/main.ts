import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './common/config/config';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: ['shot', 'transaction'],
      protoPath: [
        join(__dirname, './protos/shot.proto'),
        join(__dirname, './protos/transaction.proto'),
      ],
      url: config.port,
    },
  });
  app.listen();
}
bootstrap();
