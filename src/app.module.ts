import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {WinstonModule} from "nest-winston";
import {UserModule} from "./module/user/user.module";
import {ValidatorModule} from "./module/validator/validator.module";
import {AuthModule} from "./module/auth/auth.module";
import {LoggerConfig} from "./common/config/logger/logger.config";
import {typeOrmConfig} from "./common/config/db.config";

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig),
        WinstonModule.forRoot(LoggerConfig),
        UserModule,
        ValidatorModule,
        AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
