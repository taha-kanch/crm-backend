import { Module } from '@nestjs/common';
import { SubscriptionTypeService } from './subscription-type.service';
import { SubscriptionTypeController } from './subscription-type.controller';
import { subscriptionTypeProviders } from './subscription-type.providers';

@Module({
  providers: [SubscriptionTypeService, ...subscriptionTypeProviders],
  controllers: [SubscriptionTypeController]
})
export class SubscriptionTypeModule {}
