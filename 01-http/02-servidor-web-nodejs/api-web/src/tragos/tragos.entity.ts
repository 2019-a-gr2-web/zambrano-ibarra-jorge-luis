import {PrimaryGeneratedColumn, Column, Entity, OneToMany} from "typeorm";
import {ManyToOne} from "typeorm/decorator/relations/ManyToOne";
import {DistribuidorEntity} from "./distribuidor/distribuidor.entity";
import {FiestaEntity} from "./fiesta/fiesta.entity";
@Entity('bd_trago')
export class TragosEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({
        name: 'nombre_trago',
        type: 'varchar',
        length: 70
    })
    nombre: string;
    @Column({
        type: 'varchar',
        length: 10,
        name: 'tipo_trago',
    })
    tipo: 'Ron'|'Vodka'|'Whiskey'|'Tequila'|'Puntas'|'Cervezas';

    @Column({
        type: 'int',
        name: 'grados_alcohol',
    })
    gradosAlcohol: number;

    @Column({
        type: 'date',
        name: 'fecha_caducidad',
        default: '2019-06-19'
    })
    fechaCaducidad: Date;

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        name: 'precio',
        nullable: true
    })
    precio: number;

    @ManyToOne(type=>DistribuidorEntity, distribuidor=>distribuidor.tragos)
    distribuidorId: DistribuidorEntity

    @OneToMany( type => FiestaEntity, fiesta => fiesta.tragoId)
    fiestas: FiestaEntity[]

}


