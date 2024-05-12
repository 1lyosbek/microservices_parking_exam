import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ShotService } from './shot.service';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../shared/guards/auth/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';
import { RoleEnum } from 'src/common/enums/roleEnum';
import { RolesDecorator } from 'src/common/decorators/rolesDecorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@RolesDecorator(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.CLIENT)
@ApiTags('shot')
@Controller('shot')
export class ShotController {
  constructor(private readonly shotService: ShotService) { }

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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.CLIENT)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateShotDto: UpdateShotDto) {
    return this.shotService.update(id, updateShotDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.CLIENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shotService.remove(id);
  }
}
