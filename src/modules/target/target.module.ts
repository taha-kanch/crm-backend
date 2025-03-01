import { Module } from '@nestjs/common';
import { TargetController } from './target.controller';
import { TargetService } from './target.service';
import { TargetProviders } from './target.providers';

@Module({
  controllers: [TargetController],
  providers: [TargetService, ...TargetProviders],
  exports: [TargetService],
})
export class TargetModule {}
