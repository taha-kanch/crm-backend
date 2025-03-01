import { Body, Controller, Delete, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { TargetDto } from './dto/target.dto';
import { TargetService } from './target.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('target')
export class TargetController {

    constructor(private readonly targetService: TargetService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async upsertTarget(@Body() target: TargetDto, @Request() req) {
        const userID = req.user.id;
        return this.targetService.upsertTarget(userID, target);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getByYearAndMonth(@Query('year') year: number, @Query('month') month: number, @Request() req) {
        const userID = req.user.id;
        return this.targetService.getByYearAndMonth(userID, year, month);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('yearly')
    async getByYear(@Query('year') year: number, @Request() req) {
        const userID = req.user.id;
        return this.targetService.getByYear(userID, year);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    async deleteByYearAndMonth(@Query('year') year: number, @Query('month') month: number, @Request() req) {
        const userID = req.user.id;
        return this.targetService.deleteByYearAndMonth(userID, year, month);
    }

}
