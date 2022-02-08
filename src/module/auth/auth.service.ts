import {
    forwardRef,
    Inject,
    Injectable,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { BaseService } from '../../base';
import { User } from '../../entity/user';
import { UserRepository} from "../user/user.repository";
import { TokenPayload } from './dto/tokenpayload.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { Connection } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService extends BaseService<User> {
    constructor(
        private userService: UserService,
        @Inject(forwardRef(() => JwtService))
        private readonly JwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
        private readonly connection: Connection,
    ) {
        super(userRepository);
    }

    async getUserFromTokenPayload(
        tokenPayload: Partial<TokenPayload>,
    ): Promise<User> {
        const userId = tokenPayload.userId;
        if (!userId) {
            throw new UnprocessableEntityException('Refresh token malformed');
        }
        const where = {
            id: userId,
        };
        const relations = ['role'];
        const user = await this.userRepository.getOneAndRelation(where, relations);
        return user;
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.getUserByUserName(username);

        if (!user) {
            throw new UnauthorizedException('Username or password is incorrect');
        }

        const compareResult = await bcrypt.compare(pass, user.password);
        if (!compareResult) {
            throw new UnauthorizedException('Username or password is incorrect');
        }
        return user;
    }
}
