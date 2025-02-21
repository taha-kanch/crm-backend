import { BadRequestException, ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SUBSCRIPTION_TYPE_REPOSITORY } from 'src/core/constants';
import { SubscriptionType } from './subscription-type.entity';
import { SubscriptionTypeDto } from './dto/subscription-type.dto';
import { Attributes } from 'sequelize';

@Injectable()
export class SubscriptionTypeService {

    constructor(@Inject(SUBSCRIPTION_TYPE_REPOSITORY) private readonly subscriptionTypeRepository: typeof SubscriptionType) { }

    async create(subscriptionType: SubscriptionTypeDto): Promise<SubscriptionType> {
        try {

            const existingSubscriptionType = await this.subscriptionTypeRepository.findOne({
                where: { id: subscriptionType.id }
            })
            if (existingSubscriptionType) {
                throw new ConflictException("Subscription Type with this ID already exists.");
            }

            return await this.subscriptionTypeRepository.create<SubscriptionType>({ ...subscriptionType } as Attributes<SubscriptionType>);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findAll(): Promise<SubscriptionType[]> {
        try {
            return await this.subscriptionTypeRepository.findAll<SubscriptionType>();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOne(id): Promise<SubscriptionType | null> {
        try {
            return await this.subscriptionTypeRepository.findOne({
                where: { id },
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async delete(id) {
        try {
            return await this.subscriptionTypeRepository.destroy({
                where: { id },
            })
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(id, data) {
        try {
            const [numberOfAffectedRows, [updatedSubscriptionType]] = await this.subscriptionTypeRepository.update({ ...data }, { where: { id }, returning: true });
            return { numberOfAffectedRows, updatedSubscriptionType };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
