import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ReservaEntity} from "./reserva.entity";
import {ReservaController} from "./reserva.controller";
import {ReservaService} from "./reserva.service";
import {ClienteEntity} from "../cliente/cliente.entity";
import {ClienteService} from "../cliente/cliente.service";
import {CanchaService} from "../cancha/cancha.service";
import {CanchaEntity} from "../cancha/cancha.entity";





@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                ReservaEntity,
                ClienteEntity,
                CanchaEntity
                // PRIMERO ES LA ENTIDAD
            ],
            'default'   // SEGUNDO ES EL NOMBRE DE LA CONEXION
        )
    ],     //Modulos
    controllers:[
        ReservaController
    ], //Controladores
    providers:[
        ReservaService,
        ClienteService,
        CanchaService
    ],   //Servicios
    exports:[
        ReservaService,
        ClienteService,
        CanchaService
    ]    //Exportar los Servicios
})
export class ReservaModule
{

}
