import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ClienteEntity} from "../cliente/cliente.entity";
import {Repository} from "typeorm";
import {ReservaEntity} from "./reserva.entity";

@Injectable()
export class ReservaService{
    constructor (@InjectRepository(ReservaEntity)
                 private readonly _reservaRepository: Repository<ReservaEntity>, ){};

    crear(nuevaReserva: ReservaEntity):Promise<ReservaEntity> {
        const objetoEntidad= this._reservaRepository.create(nuevaReserva);
        return this._reservaRepository.save(objetoEntidad);//promesa
    }


    mostrar():Promise<ReservaEntity[]>{
        return this._reservaRepository.find({
            relations: ['cliente','cancha']

        });

    }


    buscar(parametrosBusqueda?):Promise<ReservaEntity[]>{
        return this._reservaRepository.find(parametrosBusqueda);
    }

    eliminarId(id: number): Promise<ReservaEntity>{
        const reservaAeliminar = this._reservaRepository
            .create({
                idReserva: id
            });

        return this._reservaRepository.remove(reservaAeliminar)


    }
    // @ts-ignore

    buscarPorId(idReserva: number): Promise<ReservaEntity> {
        return this._reservaRepository.findOne(idReserva,{
            relations: ['cliente','cancha']

        });
    }

    actualizar(idReserva: number,
               nuevaReserva: ReservaEntity): Promise<ReservaEntity> {

        nuevaReserva.idReserva = idReserva;

        const reservaEntity = this._reservaRepository.create(nuevaReserva);

        return this._reservaRepository.save(reservaEntity);
    }

}
