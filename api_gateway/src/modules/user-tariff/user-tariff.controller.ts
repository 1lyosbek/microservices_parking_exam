import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { UserTariffService } from './user-tariff.service';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesDecorator } from 'src/common/decorators/rolesDecorator';
import { JwtAuthGuard } from '../shared/guards/auth/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';
import { RoleEnum } from 'src/common/enums/roleEnum';

@ApiTags('user-tariff')
@Controller('user-tariffs')
export class UserTariffController {
  constructor(private readonly userTariffService: UserTariffService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN)
  @Post()
  create(@Body() createUserTariffDto: CreateUserTariffDto) {
    return this.userTariffService.create(createUserTariffDto);
  }

  @Get()
  findAll() {
    return this.userTariffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userTariffService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userTariffService.remove(id);
  }
}
