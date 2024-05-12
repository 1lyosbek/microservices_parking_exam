import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { FILE_PACKAGE, FILE_SERVICE } from 'src/common/consts/consts';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class FilesService implements OnModuleInit {
  private fileService: any;

  constructor(@Inject(FILE_PACKAGE) private client: ClientGrpc) {}

  onModuleInit() {
    this.fileService = this.client.getService<any>(FILE_SERVICE);
  }
  async create(file: Express.Multer.File) {
    const createFileDto = {
      url: `http://localhost:7770/${file.path}`,
      mimetype: file.mimetype,
      size: file.size,
    }
    console.log(createFileDto);
    const createdFile = await this.fileService.create(createFileDto).toPromise();
    return createdFile; 
  }

  async findAll() {
    const foundFiles = await this.fileService.findAll({}).toPromise();
    return foundFiles;
  }

  async findOne(id: number) {
    const foundFile = await this.fileService.findOneById(id).toPromise();
    return foundFile;
  }

  async remove(id: number) {
    const deletedFile = await this.fileService.delete(id).toPromise();
    return deletedFile;
  }
}
