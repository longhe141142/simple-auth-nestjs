import {User} from '../entity/user';
import {
    Injectable,
    BadRequestException,
    HttpStatus,
    HttpException,
    forwardRef,
    Inject,
    Catch,
    BadGatewayException,
} from '@nestjs/common';
import {ObjectType, Repository} from 'typeorm';
import {BaseE, RepoBase} from './';
import {Connection} from 'typeorm';
import {ResponseSuccess} from '../common/interface';
import {WINSTON_MODULE_PROVIDER} from 'nest-winston';
import {Logger} from 'winston';

@Injectable()
export class BaseService<T extends BaseE> {
    constructor(private readonly genericRepository: RepoBase<T>) {
    }

    async getAll(): Promise<T[]> {
        try {
            return await (<Promise<T[]>>this.genericRepository.getList());
        } catch (error) {
            throw new BadGatewayException(error);
        }
    }

    async get(where: any): Promise<T> {
        try {
            return await (<Promise<T>>this.genericRepository.getOne(where));
        } catch (error) {
            throw new BadGatewayException(error);
        }
    }

    async deleteById(id: string | number): Promise<void> {
        try {
            this.genericRepository.deleteById(id);
        } catch (error) {
            throw new BadGatewayException(error);
        }
    }

    buildResponsePayload(user: User, accessToken: string, refreshToken?: string) {
        return {
            user: user,
            payload: {
                type: 'bearer',
                token: accessToken,
                ...(refreshToken ? {refresh_token: refreshToken} : {}),
            },
        };
    }

    buildResponseSucess(data: any) {
        return new ResponseSuccess({data});
    }
}
