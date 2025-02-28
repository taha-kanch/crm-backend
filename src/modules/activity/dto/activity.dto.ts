import { Type } from 'class-transformer';
import { IsNotEmpty, MinLength, IsEmail, IsEnum, IsOptional, IsDate, IsMobilePhone, IsNumber, IsString, IsArray, ArrayNotEmpty, IsBoolean } from 'class-validator';
import { ActivityStatus, ActivityType } from 'src/core/constants';

export class ActivityDto {
    @IsNotEmpty()
    readonly title: string;

    @IsOptional()
    readonly description: string;

    @IsNotEmpty()
    @IsEnum(ActivityType, { message: "type must be one of: CALL, MEETING, EMAIL" })
    readonly type: string;

    @IsNotEmpty()
    @IsEnum(ActivityStatus, { message: "status must be one of: COMPLETED, SCHEDULED" })
    readonly status: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    readonly scheduleDate?: Date;

    @IsNotEmpty()
    readonly leadID: number;

    @IsNotEmpty()
    readonly userID: number;
}