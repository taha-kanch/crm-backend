import { Type } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsEnum, IsOptional, IsMobilePhone, IsNumber, IsString, IsArray, ArrayNotEmpty, IsDate } from 'class-validator';
import { Gender, IndustryType, InterestedProduct, LeadStatus } from 'src/core/constants';

export class LeadDto {
    @IsNotEmpty()
    readonly firstName: string;

    @IsNotEmpty()
    readonly lastName: string;

    @IsOptional()
    fullName: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    // @IsMobilePhone()
    readonly phoneNumber: string;

    @IsNotEmpty()
    readonly jobTitle: string;

    @IsNotEmpty()
    readonly address: string;

    @IsNotEmpty()
    readonly city: string;

    @IsNotEmpty()
    readonly state: string;

    @IsNotEmpty()
    readonly country: string;

    @IsNotEmpty()
    @IsNumber()
    readonly postalCode: number

    @IsOptional()
    @IsEnum(Gender, { message: "gender must be one of: male, female, other" })
    readonly gender: string;

    @IsNotEmpty()
    @IsEnum(LeadStatus, { message: "status must be one of: NEW, FOLLOW_UP, UNDER_REVIEW, DEMO, NEGOTIATION, WON, LOST, UNQUALIFIED" })
    readonly status: string;

    @IsNotEmpty()
    @IsNumber()
    readonly dealValue: number;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    wonDate?: Date;

    @IsNotEmpty()
    @IsString()
    readonly companyName: string;

    @IsOptional()
    @IsString()
    readonly website: string;

    @IsOptional()
    @IsNumber()
    readonly annualRevenue: number;

    @IsNotEmpty()
    @IsNumber()
    readonly numberOfEmployees: number;

    @IsNotEmpty()
    @IsEnum(IndustryType, { message: "industry type must be one of: IT, FINANCE, HEALTHCARE, EDUCATION" })
    readonly industryType: string;

    @IsOptional()
    @IsString()
    readonly fax: string;

    @IsArray()
    @IsEnum(InterestedProduct, { each: true, message: "interested product must be one of: SOFTWARE, HARDWARE, SERVICE" })
    // @ArrayNotEmpty()
    readonly interestedProducts: string[];

    @IsNotEmpty()
    readonly leadOwner: number;
}