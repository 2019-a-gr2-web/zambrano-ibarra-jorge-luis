import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {CanchaEntity} from "../cancha/cancha.entity";
import {ReservaEntity} from "../reserva/reserva.entity";




@Entity('cliente')
export class ClienteEntity{

    @PrimaryGeneratedColumn()
    idCliente:number;

    @Column({
        type:'varchar',
        length:10,
        name:'cedula_cliente'
    })
    cedulaCliente:string;

    @Column({
        type:'varchar',
        length:60,
        name:'nombre_cliente'
    })
    nombreCliente:string;

    @Column({
        type:'varchar',
        length:10,
        name:'telefono_cliente'
    })
    telefonoCliente:number;

    @Column({
        type:'varchar',
        length:100,
        name:'direccion_cliente'
    })
    direccionCliente:string;

    @OneToMany(type => ReservaEntity, reserva=>reserva.cliente)
    reserva:ReservaEntity[]



}
