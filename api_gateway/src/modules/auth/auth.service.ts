import { Inject, Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/create-auth.dto';
import { USER_PACKAGE } from 'src/common/consts/consts';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(@Inject(USER_PACKAGE) private userService: UserService) {}
  async create(loginDto: AuthLoginDto) {
    const logged = await this.userService.login(loginDto);
    return logged
  }
}
