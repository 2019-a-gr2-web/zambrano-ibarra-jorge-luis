import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragosModule} from "./tragos/tragos.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {TragosEntity} from "./tragos/tragos.entity";
import {DistribuidorEntity} from "./tragos/distribuidor/distribuidor.entity";
import {DistribuidorModule} from "./tragos/distribuidor/distribuidor.module";
import {FiestaModule} from "./tragos/fiesta/fiesta.module";
import {FiestaEntity} from "./tragos/fiesta/fiesta.entity";
import {ChatModule} from "./chat/chat.module";
import {JuegoModule} from "./juego/juego.module";
@Module({
    imports: [/* TragosModule,DistribuidorModule,FiestaModule,
       TypeOrmModule.forRoot({
            name: 'default',
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'testweb',
            entities: [
                TragosEntity,
                DistribuidorEntity,
                FiestaEntity
            ],
            synchronize: true,
        }),*/
       ChatModule,
        JuegoModule

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
