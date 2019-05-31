import { Injectable } from '@nestjs/common';
import {Productos} from "./interfaces/productos";


@Injectable()
export class ProductosService {
    bddProductos: Productos[]=[];
    recnum=1;
    constructor (){
        const productos:Productos={
            numeroProducto:1,
            nombreProducto:'Lavadora',
            descripcionProducto:'Lavadora 12 kg lg',
            fechaLanzamientoProducto: new Date(2019,5,10),
            precioProducto:13.1,
            aniosGarantiaProducto:1,
            tiendaId:1
        };
        this.crearProducto(productos)
    }
    crearProducto(nuevoProducto: Productos):Productos {
        nuevoProducto.id= this.recnum;
        this.recnum++;
        this.bddProductos.push(nuevoProducto);
        return nuevoProducto;
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
    eliminarPorId(id:number):Productos[]{
        console.log('id:', id);
        const indice= this.bddProductos.findIndex(
            (prroductos)=>{
                return prroductos.id===id
            }
        );
        this.bddProductos.splice(indice,1);
        return this.bddProductos;
    }
    buscarPorNombre(nombre: string, id:number) {
        console.log('nombre:', nombre);
        const resultado=this.bddProductos.filter(
            (producto)=>{
                return producto.nombreProducto.includes(nombre) && producto.tiendaId===id ;
            }
        );
        console.log('resultado:',resultado);
        return resultado;


    }
    buscarPorId(id: number) {
        console.log('id:', id);
        const resultado=this.bddProductos.filter(
            (producto)=>{
                return producto.tiendaId===id;
            }
        );
        console.log('resultado:',resultado);
        return resultado;


    }

}
