import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {CanchaEntity} from "../cancha/cancha.entity";
import {ClienteEntity} from "../cliente/cliente.entity";
import {DetallereservaEntity} from "../detallereserva/detallereserva.entity";



@Entity('reserva')
export class ReservaEntity{

    @PrimaryGeneratedColumn()
    idReserva:number;

    @Column({
        type:'date',
        name:'fecha_reserva',
        default:'2019-09-19'
    })
    fechaReserva:Date;

    @ManyToMany(type => ClienteEntity, cliente=>cliente.reserva)
    @JoinTable()
    cliente:ClienteEntity[]


    @OneToMany(type=>DetallereservaEntity, detalle=>detalle.res)
    detalle: DetallereservaEntity[]
}
