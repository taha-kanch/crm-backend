import { IsNotEmpty, MinLength, IsEmail, IsEnum, IsOptional, IsDate, IsMobilePhone, IsNumber } from 'class-validator';
import { Gender } from 'src/core/constants';

export class UserDto {
    @IsNotEmpty()
    readonly firstName: string;

    @IsNotEmpty()
    readonly lastName: string;

    @IsOptional()
    readonly fullName: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsOptional()
    @IsMobilePhone()
    readonly phoneNumber: string;

    @IsOptional()
    readonly address: string;

    @IsOptional()
    readonly city: string;

    @IsOptional()
    readonly state: string;

    @IsOptional()
    readonly country: string;

    @IsOptional()
    @IsNumber()
    readonly postalCode: number

    @IsOptional()
    @IsEnum(Gender, { message: "gender must be one of: male, female, other" })
    readonly gender: number;

    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;

    @IsOptional()
    readonly subscriptionID: string;

    @IsOptional()
    @IsDate()
    readonly subscriptionStartDate?: Date

    @IsOptional()
    @IsDate()
    readonly subscriptionEndDate?: Date
}

export class SubscribeUserDto {
    @IsNotEmpty()
    readonly subscriptionID: string;
}