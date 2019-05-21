import {Injectable} from '@nestjs/common';
import {Tragos} from "./interfaces/tragos";
@Injectable()
export class TragosService {

    bddTragos: Tragos[]=[];
    recnum=1;
    constructor (){
        const traguito:Tragos={
            nombre:'Pilsener',
            gradosAlcohol:4.3,
            fechaCaducidad: new Date(2019,5,10),
            precio:1.75,
            tipo:'Cervezas'
        };
        this.crear(traguito)
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
