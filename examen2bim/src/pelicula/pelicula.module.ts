import { Module } from '@nestjs/common';
import {PeliculaController} from "./pelicula.controller";
import {PeliculaService} from "./pelicula.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeliculaEntity } from './pelicula.entity';
import { ActorEntity } from '../actor/actor.entity';
import { ActorService } from '../actor/actor.service';
@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        PeliculaEntity,
        ActorEntity
      ],
'default'
    ),
  ],//Modulos
  controllers: [
    PeliculaController
  ], //Controladores
  providers: [
    PeliculaService,
    ActorService
  ], //Servicios
  exports:[
    PeliculaService
  ] //Exportar servicios
})
export class PeliculaModule {

}
