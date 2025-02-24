import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { LeadProviders } from './lead.providers';

@Module({
  providers: [LeadService, ...LeadProviders],
  controllers: [LeadController]
})
export class LeadModule {}
