import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { PeliculaEntity } from './pelicula.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeliculaService{
  constructor(@InjectRepository(PeliculaEntity)
              private readonly _pokemonRepository:Repository<PeliculaEntity>){

  }

  crear(pokemon:PeliculaEntity):Promise<PeliculaEntity>{
    const objetoRep = this._pokemonRepository.create(pokemon);
    return this._pokemonRepository.save(objetoRep);
  }

  listar(parametros?):Promise<PeliculaEntity[]>{
    return this._pokemonRepository.find(parametros);
  }

  actualizar(id:number, pokemon:PeliculaEntity):Promise<PeliculaEntity>{
    pokemon.idPelicula=id;
    const obj= this._pokemonRepository.create(pokemon);
    return this._pokemonRepository.save(obj);
  }

  eliminarPorId(id:number){
    return this._pokemonRepository.delete(id);
  }
  buscar(id:number):Promise<PeliculaEntity>{
    return this._pokemonRepository.findOne(id);
  }

}
