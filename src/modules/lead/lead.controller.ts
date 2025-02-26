import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { LeadService } from './lead.service';
import { Lead } from './lead.entity';
import { LeadDto } from './dto/lead.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('lead')
export class LeadController {

    constructor(private readonly leadService: LeadService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll( @Request() req) {
        const userID = req.user.id;
        return await this.leadService.findAll(userID);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(":id")
    async findOne(@Param('id') id: number): Promise<Lead> {
        const lead = await this.leadService.findOne(id);
        if (!lead) {
            throw new NotFoundException("This Lead does'nt exist");
        }
        return lead;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() lead: LeadDto, @Request() req): Promise<Lead> {
        return await this.leadService.create(lead);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(":id")
    async update(@Param('id') id: number, @Body() lead: LeadDto, @Request() req): Promise<Lead> {
        const { numberOfAffectedRows, updatedLead } = await this.leadService.update(id, lead);
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException("This Lead does'nt exist");
        }
        return updatedLead;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(":id")
    async remove(@Param('id') id: number, @Request() req) {
        const deleted = await this.leadService.delete(id);
        if (deleted == 0) {
            throw new NotFoundException("This Lead does'nt exist");
        }
        return 'Successfully deleted'
    }

}
