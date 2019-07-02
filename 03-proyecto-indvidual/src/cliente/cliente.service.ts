import { Injectable } from '@nestjs/common';
import {Tragos} from "../../../01-http/02-servidor-web-nodejs/api-web/src/tragos/interfaces/tragos";
import {TragosEntity} from "../../../01-http/02-servidor-web-nodejs/api-web/src/tragos/tragos.entity";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {ClienteEntity} from "./cliente.entity";

@Injectable()
export class ClienteService{
    constructor (@InjectRepository(ClienteEntity)
                 private readonly _clienteRepository: Repository<ClienteEntity>,){};


    crear(nuevoCliente: ClienteEntity):Promise<ClienteEntity> {
        const objetoEntidad= this._clienteRepository.create(nuevoCliente);
        return this._clienteRepository.save(objetoEntidad);//promesa
    }
}
