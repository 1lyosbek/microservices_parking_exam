import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UseInterceptors, UseGuards } from '@nestjs/common';
import { ParksService } from './parks.service';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { RedisKeys, RoleEnum } from 'src/common/enums/roleEnum';
import { RolesDecorator } from 'src/common/decorators/rolesDecorator';
import { JwtAuthGuard } from '../shared/guards/auth/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';

@ApiTags('park')
@Controller('parks')
export class ParksController {
  constructor(private readonly parksService: ParksService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN)
  @Post()
  create(@Body() createParkDto: CreateParkDto) {
    return this.parksService.create(createParkDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.PARKS)
  @CacheTTL(0)
  @Get()
  findAll() {
    return this.parksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.parksService.findOneById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateParkDto: UpdateParkDto) {
    return this.parksService.update(id, updateParkDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.parksService.remove(id);
  }
}
