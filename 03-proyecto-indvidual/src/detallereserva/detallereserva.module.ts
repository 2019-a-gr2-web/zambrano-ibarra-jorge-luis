import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {DetallereservaEntity} from "./detallereserva.entity";
import {DetallereservaController} from "./detallereserva.controller";
import {DetallereservaService} from "./detallereserva.service";





@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                DetallereservaEntity       // PRIMERO ES LA ENTIDAD
            ],
            'default'   // SEGUNDO ES EL NOMBRE DE LA CONEXION
        )
    ],     //Modulos
    controllers:[
        DetallereservaController
    ], //Controladores
    providers:[
        DetallereservaService
    ],   //Servicios
    exports:[
        DetallereservaService
    ]    //Exportar los Servicios
})
export class DetallereservaModule
{

}
