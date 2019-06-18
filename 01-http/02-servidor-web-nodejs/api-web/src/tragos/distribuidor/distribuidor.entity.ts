import {Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Column} from "typeorm/decorator/columns/Column";
import {TragosEntity} from "../tragos.entity";

@Entity('db_distribuidor')
export class DistribuidorEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:String

    @OneToMany(type => TragosEntity, trago=> trago.distribuidorId)
    tragos:TragosEntity[];
}