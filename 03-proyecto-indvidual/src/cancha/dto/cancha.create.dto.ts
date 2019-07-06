
import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
export class CanchaCreateDto{
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
    metroscCancha: number;

   @IsOptional()
    @IsNumber()
    detalle: number;
}