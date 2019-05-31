import { Module } from '@nestjs/common';
import {ProductosController} from "./productos.controller";
import {ProductosService} from "./productos.service";
@Module({
    imports: [],//Modulos
    controllers: [ProductosController], //Controladores
    providers: [ProductosService], //Servicios
    exports:[ProductosService] //Exportar servicios
})
export class ProductosModule {

}