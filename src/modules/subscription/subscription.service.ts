import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SUBSCRIPTION_REPOSITORY } from 'src/core/constants';
import { Subscription } from './subscription.entity';
import { SubscriptionDto } from './dto/subscription.dto';
import { Attributes } from 'sequelize';
import { SubscriptionType } from '../subscription-type/subscription-type.entity';

@Injectable()
export class SubscriptionService {

    constructor(@Inject(SUBSCRIPTION_REPOSITORY) private readonly subscriptionRepository: typeof Subscription) { }

    async create(subscription: SubscriptionDto): Promise<Subscription> {
        try {
            return await this.subscriptionRepository.create<Subscription>({ ...subscription } as Attributes<Subscription>);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findAll(): Promise<Subscription[]> {
        try {
            return await this.subscriptionRepository.findAll<Subscription>({
                include: [
                    {
                        model: SubscriptionType,
                        as: "subscriptionType",
                        attributes: ["typeName"],
                    }
                ]
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOne(id): Promise<Subscription | null> {
        try {
            return await this.subscriptionRepository.findOne({
                where: { id },
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async delete(id) {
        try {
            return await this.subscriptionRepository.destroy({
                where: { id },
            })
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(id, data) {
        try {
            const [numberOfAffectedRows, [updatedSubscription]] = await this.subscriptionRepository.update({ ...data }, { where: { id }, returning: true });
            return { numberOfAffectedRows, updatedSubscription };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}
