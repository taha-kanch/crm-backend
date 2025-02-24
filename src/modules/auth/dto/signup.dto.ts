import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, MinLength } from "class-validator";

export class SignupDto {

    @IsNotEmpty()
    readonly firstName: string;

    @IsNotEmpty()
    readonly lastName: string;

    @IsOptional()
    readonly fullName: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;
}