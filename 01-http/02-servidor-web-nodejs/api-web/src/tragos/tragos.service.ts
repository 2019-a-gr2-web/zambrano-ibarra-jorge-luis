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
        const objetoEntidad= this._tragosRepository.create(traguito);
        this._tragosRepository.save(objetoEntidad)
            .then(
                (datos)=>{
                    console.log('Dato creado:', datos)
                }

            )
            .catch(
                (error)=>{
                    console.log('Error:', error)
                }
            )
        ;

    }
    crear(nuevoTrago: Tragos):Tragos {
        nuevoTrago.id= this.recnum;
        this.recnum++;
        this.bddTragos.push(nuevoTrago);
        return nuevoTrago;
    }
    // @ts-ignore
    buscarPorId(id: number):Tragos{
        this.bddTragos.find(
            (trago)=>{
                return trago.id===id;
            }
        );
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
