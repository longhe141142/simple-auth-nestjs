import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {jwtConstants} from '../untils/constant';
import {AuthService} from '../auth.service';
import {User} from '../../../entity/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwtjsonwebtoken') {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any): Promise<User> {
        const user = await this.authService.getUserFromTokenPayload(payload);
        if (!user) throw new UnauthorizedException('unauthorized');
        return user;
    }
}
