import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {CanchaEntity} from "../cancha/cancha.entity";
import {ClienteEntity} from "../cliente/cliente.entity";
import {IsOptional} from "class-validator";



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


    @Column({
        type:'integer',
        name:'hora_inicial'
    })
    horaInicial:number;

    @Column({
        type:'integer',
        name:'hora_final'
    })
    horaFinal:number;


    @ManyToOne(type => ClienteEntity, cliente=>cliente.reserva)
    @JoinColumn({ name: "idCliente" })
    cliente:ClienteEntity



    @ManyToOne(type => CanchaEntity, cancha=>cancha.reserva)
    @JoinColumn({ name: "idCancha" })
    cancha:CanchaEntity


}
