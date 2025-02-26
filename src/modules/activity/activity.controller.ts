import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity } from './activity.entity';
import { ActivityDto } from './dto/activity.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('activity')
export class ActivityController {

    constructor(private readonly activityService: ActivityService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll( @Request() req) {
        const userID = req.user.id;
        return await this.activityService.findAll(userID);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(":id")
    async findOne(@Param('id') id: number): Promise<Activity> {
        const activity = await this.activityService.findOne(id);
        if (!activity) {
            throw new NotFoundException("This activity does'nt exist");
        }
        return activity;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() activity: ActivityDto, @Request() req): Promise<Activity> {
        return await this.activityService.create(activity);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(":id")
    async update(@Param('id') id: number, @Body() activity: ActivityDto, @Request() req): Promise<Activity> {
        const { numberOfAffectedRows, updatedActivity } = await this.activityService.update(id, activity);
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException("This activity does'nt exist");
        }
        return updatedActivity;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(":id")
    async remove(@Param('id') id: number, @Request() req) {
        const deleted = await this.activityService.delete(id);
        if (deleted == 0) {
            throw new NotFoundException("This activity does'nt exist");
        }
        return 'Successfully deleted'
    }

}
