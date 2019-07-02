import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CanchaEntity} from "./cancha.entity";
import {CanchaController} from "./cancha.controller";
import {CanchaService} from "./cancha.service";



@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                CanchaEntity       // PRIMERO ES LA ENTIDAD
            ],
            'default'   // SEGUNDO ES EL NOMBRE DE LA CONEXION
        )
    ],     //Modulos
    controllers:[
        CanchaController
    ], //Controladores
    providers:[
        CanchaService
    ],   //Servicios
    exports:[
        CanchaService
    ]    //Exportar los Servicios
})
export class CanchaModule
{

}
