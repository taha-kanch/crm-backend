import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Subscription as SubscriptionEntity } from './subscription.entity';
import { SubscriptionDto } from './dto/subscription.dto';

@Controller('subscription')
export class SubscriptionController {

    constructor(private readonly subscriptionService: SubscriptionService) { }

    @Get()
    async findAll() {
        return await this.subscriptionService.findAll();
    }

    @Get(":id")
    async findOne(@Param('id') id: number): Promise<SubscriptionEntity> {
        const subscriptionType = await this.subscriptionService.findOne(id);
        if (!subscriptionType) {
            throw new NotFoundException("This Subscription Type does'nt exist");
        }
        return subscriptionType;
    }

    @Post()
    async create(@Body() subscriptionType: SubscriptionDto, @Request() req): Promise<SubscriptionEntity> {
        return await this.subscriptionService.create(subscriptionType);
    }

    @Put(":id")
    async update(@Param('id') id: number, @Body() subscriptionType: SubscriptionDto, @Request() req): Promise<SubscriptionEntity> {
        const { numberOfAffectedRows, updatedSubscription } = await this.subscriptionService.update(id, subscriptionType);
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException("This Subscription Type does'nt exist");
        }
        return updatedSubscription;
    }

    @Delete(":id")
    async remove(@Param('id') id: number, @Request() req) {
        const deleted = await this.subscriptionService.delete(id);
        if (deleted == 0) {
            throw new NotFoundException("This Subscription Type does'nt exist");
        }
        return 'Successfully deleted'
    }

}
