import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TargetProviders } from '../target/target.providers';
import { LeadModule } from '../lead/lead.module';
import { TargetModule } from '../target/target.module';
import { ActivityModule } from '../activity/activity.module';
import { LeadProviders } from '../lead/lead.providers';
import { ActivityProviders } from '../activity/activity.providers';

@Module({
  providers: [DashboardService, ...TargetProviders, ...LeadProviders, ...ActivityProviders, ...TargetProviders],
  controllers: [DashboardController],
  imports: [LeadModule, ActivityModule, TargetModule]
})
export class DashboardModule {}
