import { Injectable } from '@nestjs/common';
import {Tiendas} from "./interfacestiendas/tiendas";



@Injectable()
export class TiendaService {
    bddTiendas: Tiendas[]=[];
    recnum=1;
    constructor (){

    }
    crearTienda(nuevaTienda: Tiendas):Tiendas {
        nuevaTienda.id= this.recnum;
        this.recnum++;
        this.bddTiendas.push(nuevaTienda);
        return nuevaTienda;
    }
    /*
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


  }*/
    eliminarPorId(id:number):Tiendas[]{
        console.log('id:', id);
        const indice= this.bddTiendas.findIndex(
            (tienda)=>{
                return tienda.id===id
            }
        );
        this.bddTiendas.splice(indice,1);
        return this.bddTiendas;
    }
    buscarPorNombre(nombre: string) {
        console.log('nombre:', nombre);
        const resultado=this.bddTiendas.filter(
            (tienda)=>{
                return tienda.nombre.includes(nombre);
            }
        );
        console.log('resultado:',resultado);
        return resultado;


    }

}
