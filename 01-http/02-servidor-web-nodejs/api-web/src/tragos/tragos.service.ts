import {Injectable} from '@nestjs/common';
import {Tragos} from "./interfaces/tragos";
import {TragosEntity} from "./tragos.entity";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class TragosService {

    bddTragos: Tragos[]=[];
    recnum=1;
    constructor (@InjectRepository(TragosEntity)
                 private readonly _tragosRepository: Repository<TragosEntity>,){
        const traguito:Tragos={
            nombre:'Pilsener',
            gradosAlcohol:4.3,
            fechaCaducidad: new Date(2019,5,10),
            precio:1.75,
            tipo:'Cervezas'
        };


        console.log('linea 1');

        console.log('linea 4');

    }
    crear(nuevoTrago: Tragos):Promise<Tragos> {
        const objetoEntidad= this._tragosRepository.create(nuevoTrago);
        return this._tragosRepository.save(objetoEntidad);//promesa

    }
    // @ts-ignore
    buscarPorId(id: number):Tragos{
        this.bddTragos.find(
            (trago)=>{
                return trago.id===id;
            }
        );
    }
    buscar(parametrosBusqueda?):Promise<Tragos[]>{
        return this._tragosRepository.find(parametrosBusqueda);
    }
    // @ts-ignore
    buscarPorNombre(nombre: string):Tragos{
        this.bddTragos.find(
            (trago)=>{
                return trago.nombre.toUpperCase().includes(nombre.toUpperCase());
            }
        );
    }
    eliminarPorId(id:number):Tragos[]{
        console.log('id:', id);
        const indice= this.bddTragos.findIndex(
            (trago)=>{
                return trago.id===id
            }
        );
        this.bddTragos.splice(indice,1);
        return this.bddTragos;
    }
    actualizar(tragoActualizado: Tragos, id:number):Tragos[]{
        const indice= this.bddTragos.findIndex(
            (trago)=>{
                return trago.id===id
            }
        );
        tragoActualizado.id=this.bddTragos[indice].id;
        this.bddTragos[indice]=tragoActualizado;
        return this.bddTragos

    }


}
