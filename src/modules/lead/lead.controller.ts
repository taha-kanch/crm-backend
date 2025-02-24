import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request } from '@nestjs/common';
import { LeadService } from './lead.service';
import { Lead } from './lead.entity';
import { LeadDto } from './dto/lead.dto';

@Controller('lead')
export class LeadController {

    constructor(private readonly leadService: LeadService) { }

    @Get()
    async findAll() {
        return await this.leadService.findAll();
    }

    @Get(":id")
    async findOne(@Param('id') id: number): Promise<Lead> {
        const subscriptionType = await this.leadService.findOne(id);
        if (!subscriptionType) {
            throw new NotFoundException("This Lead does'nt exist");
        }
        return subscriptionType;
    }

    @Post()
    async create(@Body() subscriptionType: LeadDto, @Request() req): Promise<Lead> {
        return await this.leadService.create(subscriptionType);
    }

    @Put(":id")
    async update(@Param('id') id: number, @Body() subscriptionType: LeadDto, @Request() req): Promise<Lead> {
        const { numberOfAffectedRows, updatedLead } = await this.leadService.update(id, subscriptionType);
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException("This Lead does'nt exist");
        }
        return updatedLead;
    }

    @Delete(":id")
    async remove(@Param('id') id: number, @Request() req) {
        const deleted = await this.leadService.delete(id);
        if (deleted == 0) {
            throw new NotFoundException("This Lead does'nt exist");
        }
        return 'Successfully deleted'
    }

}
