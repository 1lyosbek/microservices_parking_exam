import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LayersService } from './layers.service';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';
import { RolesDecorator } from 'src/common/decorators/rolesDecorator';
import { RoleEnum } from 'src/common/enums/roleEnum';

@ApiTags('layer')
@Controller('layers')
export class LayersController {
  constructor(private readonly layersService: LayersService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Post()
  create(@Body() createLayerDto: CreateLayerDto) {
    return this.layersService.create(createLayerDto);
  }

  @Get()
  findAll() {
    return this.layersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.layersService.findOne(+id);
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLayerDto: UpdateLayerDto) {
    return this.layersService.update(+id, updateLayerDto);
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.layersService.remove(+id);
  }
}
