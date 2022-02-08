import {
    BadRequestException,
    forwardRef, HttpStatus,
    Inject,
    Injectable,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import {BaseService} from '../../base';
import {User} from '../../entity/user';
import {UserRepository} from "../user/user.repository";
import {TokenPayload} from './dto/tokenpayload.dto';
import * as bcrypt from 'bcrypt';
import {UserService} from '../user/user.service';
import {Connection} from 'typeorm';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import {CodeName, ErrorMessage, RelationField} from "../../common/constant";
import {CreateUserDto} from "./dto/register.dto";
import {SignOptions} from "jsonwebtoken";

@Injectable()
export class AuthService extends BaseService<User> {
    constructor(
        private userService: UserService,
        @Inject(forwardRef(() => JwtService))
        private readonly JwtService: JwtService,
        // @InjectRepository(User)
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

    async register(body: Partial<CreateUserDto>): Promise<BadRequestException | User> {
        try {
                let user = await this.userService.createUser(body);
                if (user instanceof Error)
                    return new BadRequestException({
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: ErrorMessage.USER_EXISTED,
                        codeName: CodeName.USER_EXISTED,
                    });
                user = await this.userRepository.save(user);
                return user;
        } catch (e) {
            console.log(e);
            return new BadRequestException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: e.message,
                codeName: CodeName.USER_EXISTED,
            });
        }
    }
    async login(body: any) {
        // let user = await this.userRepository.getUserByUserName(body.userName);
        let user = await this.userRepository.getOneAndRelation({
            userName:body.userName
        },[]);
        if(!user)
            throw new BadRequestException("No user Found!");

        console.log(user,"abc34")
        let data = {
            userName:user.userName,
            email:user.email,
            password:user.password
        }
        let token = await this.generateAccessToken(user)
        console.log(token)
        return {
            user,
            access_token: token
        };
    }

    async generateAccessToken(user: User, expiresIn?: Number): Promise<string> {
        const payload = { username: user.userName, userId: user.id };
        console.log(payload);
        const opts: SignOptions = {};
        console.log('access generate token');
        return await this.JwtService.signAsync({ ...payload }, opts);
    }

}
