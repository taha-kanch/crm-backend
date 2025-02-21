import { IsNotEmpty } from "class-validator";

export class SubscriptionTypeDto {

    @IsNotEmpty()
    readonly id: number;

    @IsNotEmpty()
    readonly typeName: string;
}