import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CanchaEntity} from "./cancha/cancha.entity";
import {CanchaModule} from "./cancha/cancha.module";
import {ClienteEntity} from "./cliente/cliente.entity";
import {ClienteModule} from "./cliente/cliente.module";
import {ReservaEntity} from "./reserva/reserva.entity";
import {ReservaModule} from "./reserva/reserva.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            name: 'default',   // Nombre de la cadena de conexion por defecto de TYPEORM
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'proyectoindividual',
            entities: [
                CanchaEntity,
                ClienteEntity,
                ReservaEntity
            ],
            synchronize: true,
            dropSchema: false,
            insecureAuth: true
        }),
        CanchaModule,
        ClienteModule,
        ReservaModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
