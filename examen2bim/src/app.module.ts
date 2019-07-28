import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActorModule } from './actor/actor.module';
import { PeliculaModule } from './pelicula/pelicula.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario/usuario.entity';
import { ActorEntity } from './actor/actor.entity';
import { PeliculaEntity } from './pelicula/pelicula.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { PedidoEntity } from './pedido/pedido.entity';
import { PedidoModule } from './pedido/pedido.module';
import { ComunicacionModule } from './comunicacion/comunicacion.module';
import { DetalleEntity } from './detalle/detalle.entity';
import { DetalleModule } from './detalle/detalle.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name:'default',
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'root',
      database:'examenWeb2',
      entities:[
        UsuarioEntity,
        ActorEntity,
        PeliculaEntity,
        PedidoEntity,
        DetalleEntity
      ],
      synchronize:true,
      dropSchema:false,
      insecureAuth:true
    }),
    ActorModule,
    UsuarioModule,
    PeliculaModule,
    PedidoModule,
    ComunicacionModule,
    DetalleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
