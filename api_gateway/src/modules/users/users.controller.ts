import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseInterceptors, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { RedisKeys, RoleEnum } from 'src/common/enums/roleEnum';
import { RolesDecorator } from 'src/common/decorators/rolesDecorator';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.USERS)
  @CacheTTL(0)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
