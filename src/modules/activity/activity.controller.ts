import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity } from './activity.entity';
import { ActivityDto } from './dto/activity.dto';

@Controller('activity')
export class ActivityController {

    constructor(private readonly activityService: ActivityService) { }

    // @Get()
    // async findAll() {
    //     return await this.activityService.findAll();
    // }

    // @Get(":id")
    // async findOne(@Param('id') id: number): Promise<Activity> {
    //     const subscriptionType = await this.activityService.findOne(id);
    //     if (!subscriptionType) {
    //         throw new NotFoundException("This activity does'nt exist");
    //     }
    //     return subscriptionType;
    // }

    // @Post()
    // async create(@Body() subscriptionType: ActivityDto, @Request() req): Promise<Activity> {
    //     return await this.activityService.create(subscriptionType);
    // }

    // @Put(":id")
    // async update(@Param('id') id: number, @Body() subscriptionType: ActivityDto, @Request() req): Promise<Activity> {
    //     const { numberOfAffectedRows, updatedActivity } = await this.activityService.update(id, subscriptionType);
    //     if (numberOfAffectedRows === 0) {
    //         throw new NotFoundException("This activity does'nt exist");
    //     }
    //     return updatedActivity;
    // }

    // @Delete(":id")
    // async remove(@Param('id') id: number, @Request() req) {
    //     const deleted = await this.activityService.delete(id);
    //     if (deleted == 0) {
    //         throw new NotFoundException("This activity does'nt exist");
    //     }
    //     return 'Successfully deleted'
    // }

}
