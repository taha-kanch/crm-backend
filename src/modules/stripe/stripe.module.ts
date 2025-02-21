import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { UsersModule } from '../users/users.module';
import { SubscriptionProviders } from '../subscription/subscription.providers';

@Module({
  controllers: [StripeController],
  providers: [StripeService, ...SubscriptionProviders],
  imports: [UsersModule],
})
export class StripeModule {}
