import { IsNotEmpty, MinLength, IsEmail, IsEnum, IsOptional, IsDate, isNotEmpty } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

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