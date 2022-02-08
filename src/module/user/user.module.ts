import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {UserRepository} from "./user.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserSubscriber} from "./user.subscriber";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository,
        ]),
    ],
    controllers: [UserController],
    providers: [UserService, UserSubscriber],
    exports: [UserService],
})
export class UserModule {
}
