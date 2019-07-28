import { IsDate, IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ActorEntity } from '../../actor/actor.entity';

export class PeliculaUpdateDto{
  @IsNotEmpty()
  idPelicula:number;

  @IsNotEmpty()
  @IsString()
  nombrePelicula:string;

  @IsNotEmpty()
  @IsString()
  actoresPrincipalesPelicula:string;

  @IsNotEmpty()
  @IsString()
  sinopsisPelicula:string;

  @IsNotEmpty()
  @IsNumber()
  anioLanzamientoPelicula:number;

  @IsNotEmpty()
  actor:ActorEntity;

  @IsNotEmpty()
  @IsNumber()
  ratingPelicula:number;

}
