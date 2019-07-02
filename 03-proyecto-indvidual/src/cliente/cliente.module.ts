import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ClienteEntity} from "./cliente.entity";
import {ClienteController} from "./cliente.controller";
import {ClienteService} from "./cliente.service";




@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                ClienteEntity       // PRIMERO ES LA ENTIDAD
            ],
            'default'   // SEGUNDO ES EL NOMBRE DE LA CONEXION
        )
    ],     //Modulos
    controllers:[
        ClienteController
    ], //Controladores
    providers:[
        ClienteService
    ],   //Servicios
    exports:[
        ClienteService
    ]    //Exportar los Servicios
})
export class ClienteModule
{

}
