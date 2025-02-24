import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {

    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

    async create(user: UserDto | any): Promise<User> {
        try {
            return await this.userRepository.create<User>(user);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findOneByEmail(email: string): Promise<User | null> {
        try {
            return await this.userRepository.findOne<User>({ where: { email } });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findOneById(id: number): Promise<User | null> {
        try {
            return await this.userRepository.findOne<User>({ where: { id } });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async update(id, data) {
        try {
            const [numberOfAffectedRows, [updatedUser]] = await this.userRepository.update({ ...data }, { where: { id }, returning: true });
            return { numberOfAffectedRows, updatedUser };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async subscribeUser(id: number, data) {
        try {
            const startDate = new Date();
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + data.duration);
            const body = {
                subscriptionID: data.id,
                subscriptionStartDate: startDate,
                subscriptionEndDate: endDate,
            }
            return await this.userRepository.update({ ...body }, { where: { id } });

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}