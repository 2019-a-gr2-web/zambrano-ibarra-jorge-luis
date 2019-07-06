
import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
export class CanchaUpdateDto{
    @IsEmpty()
    idCancha:number;

    @IsNotEmpty()
    @IsString()
    descripcionCancha: string;

    @IsNotEmpty()
    @IsNumber()
    numeroCancha: number;

    @IsNotEmpty()
    @IsNumber()
    precioCancha: number;

    @IsNotEmpty()
    @IsNumber()
    metrosCancha: number;

    @IsOptional()
    @IsNumber()
    detalle: number;
}