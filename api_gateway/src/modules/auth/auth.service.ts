import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { USER_PACKAGE, USER_SERVICE } from 'src/common/consts/consts';
import { AuthLoginDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: any;

  constructor(
    @Inject(USER_PACKAGE) private UserClient: ClientGrpc,
    private jwtService: JwtService,
  ) { }

  onModuleInit() {
    this.userService = this.UserClient.getService<any>(USER_SERVICE);
  }
  async create(loginAuthDto: AuthLoginDto) {
    const loggedUser = await this.userService.login(loginAuthDto).toPromise();
    console.log(loggedUser);
    const token = await this.jwtService.signAsync({id: loggedUser.data.id});
    loggedUser.data.token = token;
    return loggedUser;
  }
}