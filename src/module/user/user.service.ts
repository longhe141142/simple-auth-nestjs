import {
    BadRequestException,
    HttpStatus,
    Inject,
    Injectable,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from "./user.repository";
import {Connection, EntityManager} from 'typeorm';
import {
    ErrorHandle, ResponseSuccess, ResponseError, ResponseReport
} from "../../common/interface";
import {User} from '../../entity/user';
import {BaseService} from '../../base';

import {CodeName, ErrorMessage} from "../../common/constant";
import {WINSTON_MODULE_PROVIDER} from 'nest-winston';
import {Logger} from 'winston';
import {UserDto} from '../../common/dto/user.dto';
import {CreateUserDto} from "../auth/dto/register.dto";

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectRepository(UserRepository)
        public readonly userRepository: UserRepository,
        private readonly connection: Connection,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {
        super(userRepository);
    }

    createUser(user: Partial<CreateUserDto>): User {
        const userInstance = new User({
            ...user,
            createdBy: user.userName,
            updatedBy: user.userName,
        });
        return userInstance;
    }

    getUserByUserName = async (username: string) => {
        return await this.userRepository.getUserByUserName(username);
    };

    async checkUserExist(userName: string) {
        return await this.userRepository.checkUserExist(userName);
    }

    checkEmailExist = async (email: string) => {
        return await this.userRepository.checkEmailExist(email);
    };

    getUserRole(manager: EntityManager = null) {
    }
}
