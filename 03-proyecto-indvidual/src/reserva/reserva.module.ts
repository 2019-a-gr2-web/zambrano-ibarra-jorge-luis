import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ReservaEntity} from "./reserva.entity";
import {ReservaController} from "./reserva.controller";
import {ReservaService} from "./reserva.service";





@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                ReservaEntity       // PRIMERO ES LA ENTIDAD
            ],
            'default'   // SEGUNDO ES EL NOMBRE DE LA CONEXION
        )
    ],     //Modulos
    controllers:[
        ReservaController
    ], //Controladores
    providers:[
        ReservaService
    ],   //Servicios
    exports:[
        ReservaService
    ]    //Exportar los Servicios
})
export class ReservaModule
{

}
