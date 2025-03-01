import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@nestjs/passport';
import { ActivityService } from '../activity/activity.service';

@Controller('dashboard')
export class DashboardController {

    constructor(
        private readonly dashboardService: DashboardService,
        private readonly activityService: ActivityService,
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('summary')
    async getSummary(@Request() req) {
        const userID = req.user.id;
        return this.dashboardService.getSummary(userID);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('leads-analytics')
    async getLeadsAnalytics(@Query('year') year: number, @Request() req) {
        const userID = req.user.id;
        return this.dashboardService.getLeadsAnalytics(userID, year);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('lead-value-summary')
    async getLeadValueSummary(@Request() req, @Query('type') type: 'MONTHLY' | 'YEARLY', @Query('year') year?: number) {
        const userID = req.user.id;
        return this.dashboardService.getLeadValueSummary(userID, type, year);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('activities/upcoming')
    async getUpcomingActivities(@Request() req) {
        const userID = req.user.id;
        return this.activityService.getUpcomingScheduledActivities(userID)
    }
}
