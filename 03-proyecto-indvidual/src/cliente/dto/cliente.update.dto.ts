
import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
export class ClienteUpdateDto{
    @IsEmpty()
    idCliente:number;

    @IsNotEmpty()
    @IsString()
    nombreCliente: string;

    @IsNotEmpty()
    @IsString()
    cedulaCliente: string;

    @IsNotEmpty()
    @IsString()
    direccionCliente: string;

    @IsNotEmpty()
    @IsString()
    telefonoCliente: string;
}