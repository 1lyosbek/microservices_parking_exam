import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TariffsService } from './tariffs.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesDecorator } from 'src/common/decorators/rolesDecorator';
import { RoleEnum } from 'src/common/enums/roleEnum';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';

@ApiTags('tariff')
@Controller('tariffs')
export class TariffsController {
  constructor(private readonly tariffsService: TariffsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.CLIENT)
  @Post()
  create(@Body() createTariffDto: CreateTariffDto) {
    return this.tariffsService.create(createTariffDto);
  }

  @Get()
  findAll() {
    return this.tariffsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tariffsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.CLIENT)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTariffDto: UpdateTariffDto) {
    return this.tariffsService.update(id, updateTariffDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.CLIENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tariffsService.remove(id);
  }
}
