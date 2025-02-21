import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request } from '@nestjs/common';
import { SubscriptionTypeService } from './subscription-type.service';
import { SubscriptionType as SubscriptionTypeEntity } from './subscription-type.entity';
import { SubscriptionTypeDto } from './dto/subscription-type.dto';

@Controller('subscription-type')
export class SubscriptionTypeController {

    constructor(private readonly subscriptionTypeService: SubscriptionTypeService) {}

    @Get()
    async findAll() {
        return await this.subscriptionTypeService.findAll();
    }

    @Get(":id")
    async findOne(@Param('id') id: number): Promise<SubscriptionTypeEntity> {
        const subscriptionType = await this.subscriptionTypeService.findOne(id);
        if(!subscriptionType) {
            throw new NotFoundException("This Subscription Type does'nt exist");
        }
        return subscriptionType;
    }

    @Post()
    async create(@Body() subscriptionType: SubscriptionTypeDto, @Request() req): Promise<SubscriptionTypeEntity>  {
        return await this.subscriptionTypeService.create(subscriptionType);
    }

    @Put(":id")
    async update(@Param('id') id: number, @Body() subscriptionType: SubscriptionTypeDto, @Request() req): Promise<SubscriptionTypeEntity> {
        const { numberOfAffectedRows, updatedSubscriptionType } = await this.subscriptionTypeService.update(id, subscriptionType);
        if(numberOfAffectedRows === 0) {
            throw new NotFoundException("This Subscription Type does'nt exist");
        }
        return updatedSubscriptionType;
    }

    @Delete(":id")
    async remove(@Param('id') id: number, @Request() req) {
        const deleted = await this.subscriptionTypeService.delete(id);
        if(deleted == 0) {
            throw new NotFoundException("This Subscription Type does'nt exist");
        }
        return 'Successfully deleted'
    }

}
