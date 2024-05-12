import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesDecorator } from 'src/common/decorators/rolesDecorator';
import { RoleEnum } from 'src/common/enums/roleEnum';
import { JwtAuthGuard } from '../shared/guards/auth/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';

@ApiTags('service')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.CLIENT)
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.CLIENT)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.CLIENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.remove(id);
  }
}
