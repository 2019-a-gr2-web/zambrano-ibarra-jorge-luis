import { Module } from '@nestjs/common';
import {TiendaController} from "./tienda.controller";
import {TiendaService} from "./tienda.service";
@Module({
    imports: [],//Modulos
    controllers: [TiendaController], //Controladores
    providers: [TiendaService], //Servicios
    exports:[TiendaService] //Exportar servicios
})
export class TiendaModule {

}