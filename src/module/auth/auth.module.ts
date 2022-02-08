import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserRepository} from "../user/user.repository";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./untils/constant";
import {ValidatorModule} from "../validator/validator.module";
import {UserModule} from "../user/user.module";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {LocalStrategy} from "./strategy/local.strategy";
import {LocalStrategy2} from "./strategy/local2.strategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            // signOptions: { expiresIn: '600s' },
            // secretOrPrivateKey:jwtConstants.secret
        }),
        ValidatorModule,
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, LocalStrategy, LocalStrategy2],
    exports: [AuthService],
})
export class AuthModule {
}
