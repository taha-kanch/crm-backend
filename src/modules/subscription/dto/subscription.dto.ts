import { IsNotEmpty, IsOptional } from "class-validator";

export class SubscriptionDto {

    @IsNotEmpty()
    readonly typeID: number;

    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    readonly duration: number;

    @IsNotEmpty()
    readonly description: string;

    @IsOptional()
    readonly active?: Boolean;
}