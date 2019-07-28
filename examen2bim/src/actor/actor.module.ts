import { Module } from '@nestjs/common';
import {ActorController} from "./actor.controller";
import {ActorService} from "./actor.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorEntity } from './actor.entity';
import { PeliculaEntity } from '../pelicula/pelicula.entity';
import { PeliculaService } from '../pelicula/pelicula.service';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { PeliculaModule } from '../pelicula/pelicula.module';
@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        ActorEntity,
        PeliculaEntity,
        UsuarioEntity
      ],
      'default'
    ),
  ],//Modulos
  controllers: [
    ActorController
  ], //Controladores
  providers: [
    ActorService,
    PeliculaService,
    UsuarioService
  ], //Servicios
  exports:[
    ActorService
  ] //Exportar servicios
})
export class ActorModule {

}
