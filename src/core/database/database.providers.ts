import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from 'src/modules/users/user.entity';
import { SubscriptionType } from 'src/modules/subscription-type/subscription-type.entity';
import { Subscription } from 'src/modules/subscription/subscription.entity';
import { Lead } from 'src/modules/lead/lead.entity';
import { Activity } from 'src/modules/activity/activity.entity';
import { Target } from 'src/modules/target/target.entity';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([User, SubscriptionType, Subscription, Lead, Activity, Target]);
        await sequelize.sync();
        return sequelize;
    },
}];