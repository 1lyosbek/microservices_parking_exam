import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FILE_PACKAGE } from 'src/common/consts/consts';
import { join } from 'path';
import { config } from 'src/common/config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: FILE_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'file',
          protoPath: join(__dirname, '../../protos/file.proto'),
          url: config.fileServerUrl,
        },
      },
    ]),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
