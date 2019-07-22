import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {ReservaEntity} from "../reserva/reserva.entity";



@Entity('cancha')
export class CanchaEntity{

    @PrimaryGeneratedColumn()
    idCancha:number;

    @Column({
        type:'varchar',
        length:50,
        name:'descripcion_cancha'
    })
    descripcionCancha:string;

    @Column({
        type:'integer',
        name:'numero_cancha'
    })
    numeroCancha:number;
    @Column({
        type:'float',
         name:'precio_cancha'
    })
    precioCancha:number;
    @Column({
        type:'float',
        name:'metrosc_cancha'
    })
    metroscCancha:number;

    @OneToMany(type => ReservaEntity, reserva=>reserva.cliente)
    reserva:ReservaEntity[]




}
