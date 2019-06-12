import { Module } from '@nestjs/common';
import {TragosController} from "./tragos.controller";
import {TragosService} from "./tragos.service";
import {TragosEntity} from "./tragos.entity";
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                TragosEntity
            ],
            'default'
        ),
    ],//Modulos
    controllers: [TragosController], //Controladores
    providers: [TragosService], //Servicios
    exports:[TragosService] //Exportar servicios
})
export class TragosModule {}

