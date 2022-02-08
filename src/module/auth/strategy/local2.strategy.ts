import { Strategy } from 'passport-local';
import { jwtConstants } from '../untils/constant';

import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy2 extends PassportStrategy(Strategy, 'local2') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userName',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('entry local2');
    return 'enter';
  }
}
