import { Injectable } from '@nestjs/common';
import {ClienteEntity} from "../cliente/cliente.entity";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {CanchaEntity} from "./cancha.entity";

@Injectable()
export class CanchaService{
    constructor (@InjectRepository(CanchaEntity)
                 private readonly _canchaRepository: Repository<CanchaEntity>,){};


    crear(nuevaCancha: CanchaEntity):Promise<CanchaEntity> {
        const objetoEntidad= this._canchaRepository.create(nuevaCancha);
        return this._canchaRepository.save(objetoEntidad);//promesa
    }

    buscar(parametrosBusqueda?):Promise<CanchaEntity[]>{
        return this._canchaRepository.find(parametrosBusqueda);
    }

    eliminarId(id: number): Promise<CanchaEntity>{
        const canchaAEliminar = this._canchaRepository
            .create({
                idCancha: id
            });

        return this._canchaRepository.remove(canchaAEliminar)


    }
    // @ts-ignore

    buscarPorId(idCancha: number): Promise<CanchaEntity> {
        return this._canchaRepository.findOne(idCancha);
    }

    actualizar(idCancha: number,
               nuevaCancha: CanchaEntity): Promise<CanchaEntity> {

        nuevaCancha.idCancha = idCancha;

        const canchaEntity = this._canchaRepository.create(nuevaCancha);

        return this._canchaRepository.save(canchaEntity);
    }
}
