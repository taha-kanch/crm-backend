import { IsNotEmpty, IsNumber } from "class-validator";

export class TargetDto {

    @IsNotEmpty()
    @IsNumber()
    readonly year: number;

    @IsNotEmpty()
    @IsNumber()
    readonly month: number;

    @IsNotEmpty()
    @IsNumber()
    readonly targetValue: number;

}