
import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
export class ReservaUpdateDto{
    @IsEmpty()
    idReserva:number;


    @IsNotEmpty()
    @IsDate()
    fechaReserva: Date;

    @IsOptional()
    @IsNumber()
    horaInicial: number;

    @IsOptional()
    @IsNumber()
    horaFinal: number;

    @IsOptional()
    @IsNumber()
    cliente: number;

    @IsOptional()
    @IsNumber()
    cancha: number;


}