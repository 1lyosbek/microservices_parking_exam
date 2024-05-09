import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesDecorator } from 'src/common/decorators/rolesDecorator';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';
import { RoleEnum } from 'src/common/enums/roleEnum';

@ApiTags('place')
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.create(createPlaceDto);
  }

  @Get()
  findAll() {
    return this.placesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.placesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placesService.update(id, updatePlaceDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.placesService.remove(id);
  }
}
