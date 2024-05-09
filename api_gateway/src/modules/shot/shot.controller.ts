import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ShotService } from './shot.service';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('shot')
@Controller('shot')
export class ShotController {
  constructor(private readonly shotService: ShotService) {}

  @Post()
  create(@Body() createShotDto: CreateShotDto) {
    return this.shotService.create(createShotDto);
  }

  @Get()
  findAll() {
    return this.shotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateShotDto: UpdateShotDto) {
    return this.shotService.update(id, updateShotDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shotService.remove(id);
  }
}
