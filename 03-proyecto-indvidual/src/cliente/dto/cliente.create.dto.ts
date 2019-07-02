
import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
export class ClienteCreateDto{
    @IsEmpty()
    idCliente:number;

    @IsNotEmpty()
    @IsString()
    nombreCliente: string;

    @IsNotEmpty()
    cedulaCliente: string;

    @IsNotEmpty()
    direccionCliente: string;

    @IsNotEmpty()
    @IsNumber()
    telefonoCliente: number;

    @IsOptional()
    @IsNumber()
    reserva: number;
}