import { Controller, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FilesService } from './files.service';
import { ResData } from 'src/lib/resData';
import { FileEntity } from './entities/file.entity';
import {  IFileById } from './interfaces/controller.interface';
import { CreateFileDto } from './dto/file-controller.dto';
import { AllExceptionsFilter } from 'src/lib/rpc-exeptionFilter';

@Controller()
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
  ) {}

  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod('FileService', 'Create')
  async create(data: CreateFileDto) {
    const createdFile = await this.filesService.create(data);
    return new ResData<FileEntity>("file created successfully", 200, createdFile);
  }
  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod('FileService', 'FindAll')
  async findAll({}) {
    const allAvailableFiles = await this.filesService.findAll();
    const repeated: { files: FileEntity[] } = { files: allAvailableFiles };
    const resData = new ResData<{ files: Array<FileEntity> }>("all available files", 200, repeated);
    return resData
  }
  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod('FileService', 'FindOneById')
  async findOne(data: IFileById) {
    const foundFile = await this.filesService.findOne(data.id);
    return new ResData<FileEntity>("found file", 200, foundFile);
  }
  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod('FileService', 'Delete')
  async delete(data: IFileById) {
    const foundFile = await this.filesService.findOne(data.id);
    const deletedFile = await this.filesService.remove(foundFile);
    return new ResData<FileEntity>("file deleted successfully", 200, deletedFile);
  }
}
