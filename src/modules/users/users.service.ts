import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {

    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

    async create(user: UserDto): Promise<User> {
        return await this.userRepository.create<User>(user);
    }

    async findOneByEmail(email_id: string): Promise<User> {
        console.log("^^^^^^^^^*************^^^^^^^^^",email_id);
        return await this.userRepository.findOne<User>({ where: { email_id } });
    }

    async findOneById(id: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { id } });
    }
}