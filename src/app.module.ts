import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SubscriptionTypeModule } from './modules/subscription-type/subscription-type.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { LeadModule } from './modules/lead/lead.module';
import { ActivityModule } from './modules/activity/activity.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { TargetModule } from './modules/target/target.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    SubscriptionTypeModule,
    SubscriptionModule,
    StripeModule,
    LeadModule,
    ActivityModule,
    DashboardModule,
    TargetModule
  ],
  providers: []
})
export class AppModule {}
