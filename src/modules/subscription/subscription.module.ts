import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionProviders } from './subscription.providers';

@Module({
  providers: [SubscriptionService, ...SubscriptionProviders],
  controllers: [SubscriptionController]
})
export class SubscriptionModule {}
