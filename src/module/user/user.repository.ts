import {
    EntityRepository,
    Repository,
    SelectQueryBuilder,
    EntityManager,
} from 'typeorm';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from '../../entity/user';

interface partials {
    id: number;
    name: string;
}

import {Injectable} from '@nestjs/common';
import {RepoBase} from '../../base';

@EntityRepository(User)
@Injectable()
export class UserRepository extends RepoBase<User> {
    constructor(private readonly userService: UserService) {
        super(User, 'user', ['employeeData', 'employees']);
    }

    insertUser = async (
        payload,
        transactionEntityManager: EntityManager = null,
    ): Promise<User | any> => {
        const user = new User({...payload});
        if (!transactionEntityManager) {
            await this.save(user);
        } else {
            await transactionEntityManager.save(user);
        }
        return user;
    };

    getUserByUserName = async (
        userName: string,
        transactionEntityManager: EntityManager = null,
    ) => {
        const rel = !transactionEntityManager
            ? await this.findOne({userName})
            : await transactionEntityManager.findOne(User, userName);
        return rel;
    };

    async checkUserExist(userName: string) {
        return !!(await this.findOne({userName}));
    }

    async checkEmailExist(email: string) {
        return !!(await this.findOne({email}));
    }
}
