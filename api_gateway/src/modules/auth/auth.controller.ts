import { Controller, Post, Body  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() loginDto: AuthLoginDto) {
    return this.authService.create(loginDto);
  }
}
