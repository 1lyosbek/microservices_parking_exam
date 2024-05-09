import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { ParksService } from './parks.service';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/enums/roleEnum';

@ApiTags('park')
@Controller('parks')
export class ParksController {
  constructor(private readonly parksService: ParksService) {}

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

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateParkDto: UpdateParkDto) {
    return this.parksService.update(id, updateParkDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.parksService.remove(id);
  }
}
