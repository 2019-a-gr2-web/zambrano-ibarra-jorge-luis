import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ProductosModule} from "./productos/productos.module";
import {TiendaModule} from "./tiendas/tienda.module";

@Module({
  imports: [ProductosModule, TiendaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
