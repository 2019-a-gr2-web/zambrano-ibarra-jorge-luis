import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {CanchaEntity} from "../cancha/cancha.entity";
import {ReservaEntity} from "../reserva/reserva.entity";



@Entity('detalle_reserva')
export class DetallereservaEntity{

    @PrimaryGeneratedColumn()
    idDetalle:number;

    @Column({
        type:'varchar',
        length:100,
        name:'descripcion_detalle'
    })
    descripcionDetalle:string;

    @Column({
        type:'date',
        name:'fecha_inicial',
        default:'2019-09-19'
    })
    fechaInicialDetalle:Date;
    @Column({
        type:'date',
        name:'fecha_final',
        default:'2019-09-19'
    })
    fechaFinalDetalle:Date;

    @Column({
        type:'float',
        name:'precio_unitario'
    })
    preicioUnitario:number;

    @ManyToMany(type => CanchaEntity, cancha=>cancha.detalle)
    @JoinTable()
    cancha:CanchaEntity[]
    @ManyToOne(type=>ReservaEntity, reserva=>reserva.detalle)
    res: ReservaEntity[]
}
