import {Injectable}  from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ActorEntity } from './actor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActorService {
  constructor(@InjectRepository(ActorEntity)
              private readonly _actorRepository: Repository<ActorEntity>) {
  }

  crear(actor: ActorEntity): Promise<ActorEntity> {
    const obj = this._actorRepository.create(actor);
    return this._actorRepository.save(obj);
  }
  listar(parametros?):Promise<ActorEntity[]>{
    return this._actorRepository.find(parametros);
  }
  buscar(id:number):Promise<ActorEntity>{
    return this._actorRepository.findOne(id);
  }
  actualizar(id:number,actor:ActorEntity):Promise<ActorEntity>{
    actor.idActor = id;
    const obj = this._actorRepository.create(actor);
    return this._actorRepository.save(obj);
  }
}

