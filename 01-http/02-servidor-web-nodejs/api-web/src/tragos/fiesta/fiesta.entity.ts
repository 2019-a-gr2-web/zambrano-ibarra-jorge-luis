import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TragosEntity} from "../tragos.entity";

@Entity('db_fiesta')
export class FiestaEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:String;

    @ManyToOne( type => TragosEntity, trago=>trago.fiestas)
    tragoId: TragosEntity;
}