import { IsBoolean, IsDate, IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ActorCrearDto{

  @IsEmpty()
  idActor:number;

  @IsNotEmpty()
  @IsString()
  nombreActor:string;

  @IsNotEmpty()
  @IsString()
  apellidoActor:string;

  @IsNotEmpty()
  @IsDate()
  fechaNacimientoActor:Date;

  @IsNotEmpty()
  @IsNumber()
  numeroPeliculaActor:number;

  @IsNotEmpty()
  @IsBoolean()
  retiradoActor:boolean;

}
