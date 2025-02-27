import { IsArray, IsNotEmpty, IsOptional } from "class-validator";

export class SubscriptionDto {

    @IsNotEmpty()
    readonly typeID: number;
    
    @IsNotEmpty()
    readonly planName: string;

    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    readonly duration: number;

    @IsNotEmpty()
    readonly description: string;

    @IsArray()
    @IsOptional()
    readonly features?: string[];

    @IsOptional()
    readonly active?: Boolean;
}