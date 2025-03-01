import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { ActivityProviders } from './activity.providers';

@Module({
  providers: [ActivityService, ...ActivityProviders],
  controllers: [ActivityController],
  exports: [ActivityService],
})
export class ActivityModule {}
