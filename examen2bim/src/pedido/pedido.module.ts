import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorEntity } from '../actor/actor.entity';
import { ActorService } from '../actor/actor.service';
import { PedidoEntity } from './pedido.entity';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';
import { PeliculaEntity } from '../pelicula/pelicula.entity';
import { PeliculaService } from '../pelicula/pelicula.service';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { DetalleEntity } from '../detalle/detalle.entity';
import { DetalleService } from '../detalle/detalle.service';
@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        PedidoEntity,
        ActorEntity,
        PeliculaEntity,
        UsuarioEntity,
        DetalleEntity
      ],
      'default'
    ),
  ],//Modulos
  controllers: [
    PedidoController
  ], //Controladores
  providers: [
    PedidoService,
    ActorService,
    PeliculaService,
    UsuarioService,
    DetalleService
  ], //Servicios
  exports:[
    PedidoService
  ] //Exportar servicios
})
export class PedidoModule {

}
