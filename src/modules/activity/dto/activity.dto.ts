import { IsNotEmpty, MinLength, IsEmail, IsEnum, IsOptional, IsDate, IsMobilePhone, IsNumber, IsString, IsArray, ArrayNotEmpty, IsBoolean } from 'class-validator';
import { ActivityStatus, ActivityType, Gender, IndustryType, InterestedProduct, LeadStatus } from 'src/core/constants';

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
    @IsBoolean()
    readonly reminder?: boolean;

    @IsOptional()
    @IsEmail()
    readonly emailAt?: string;

    @IsOptional()
    @IsDate()
    readonly fromDate?: Date;

    @IsOptional()
    @IsDate()
    readonly toDate?: Date;

    @IsNotEmpty()
    readonly leadID: number;
}