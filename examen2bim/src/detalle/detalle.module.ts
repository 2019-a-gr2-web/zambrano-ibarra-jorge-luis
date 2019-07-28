import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorEntity } from '../actor/actor.entity';
import { PeliculaEntity } from '../pelicula/pelicula.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ActorController } from '../actor/actor.controller';
import { ActorService } from '../actor/actor.service';
import { PeliculaService } from '../pelicula/pelicula.service';
import { UsuarioService } from '../usuario/usuario.service';
import { DetalleEntity } from './detalle.entity';
import { DetalleController } from './detalle.controller';
import { DetalleService } from './detalle.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        DetalleEntity
      ],
      'default'
    ),
  ],//Modulos
  controllers: [
   DetalleController
  ], //Controladores
  providers: [
    DetalleService
  ], //Servicios
  exports:[
    DetalleService
  ] //Exportar servicios
})
export class DetalleModule {

}
