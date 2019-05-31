import {Controller, Get, Response, Request, Headers, Post, Body, Res, Param} from '@nestjs/common';
import {ProductosService} from "./productos.service";
import {Productos} from "./interfaces/productos";
import {Tiendas} from "../tiendas/tiendas";
@Controller('examen/tienda')
export class ProductosController {
    constructor(private readonly productosService: ProductosService) {

    }
    @Get('/gestionarProductos/:id')
    gestionarHijos(@Param() params, @Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {
        id= Number(params.id);
        const cookieSeg = request.signedCookies;
        const arregloProductos= this.productosService.buscarPorId(Number(id));
        console.log('arrprod:',arregloProductos);

        return response.render('Productos/gestionarproductos',{id:id,arregloProductos:arregloProductos,nombre:cookieSeg.nombreUsuario})
    }
    @Get('/busquedaProducto/:id')
    busquedaHijos(@Param() params, @Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {
        id= Number(params.id);
        const cookieSeg = request.signedCookies;
            return response.render('Productos/gestionarproductos',{id:id,arregloProductos:arregloProductoBusqueda,nombre:cookieSeg.nombreUsuario})

    }


    @Get('/crearProducto/:id')
    crearProducto( @Param() params,@Res() res,@Request() request){
        const cookieSeg = request.signedCookies;
        console.log(id);
        return res.render('Productos/crearproductos',{
            nombre:cookieSeg.nombreUsuario,
            id:id
        })


    }
    @Post('/crearProducto')
    crearProductoPost(
        @Body() producto:Productos,
        @Res() res,
        @Param() params
    ){

        producto.precioProducto=Number(producto.precioProducto);
        producto.numeroProducto=Number(producto.numeroProducto);
        producto.aniosGarantiaProducto=Number(producto.aniosGarantiaProducto);
        producto.tiendaId=Number(producto.tiendaId);
        producto.fechaLanzamientoProducto =new Date(producto.fechaLanzamientoProducto);
        console.log(producto);
        this.productosService.crearProducto(producto);
        res.redirect('/examen/tienda/gestionarProductos/'+producto.tiendaId);
    }
    @Post('eliminarProductos')
    eliminarProducto(@Param() params,@Res() res,  @Body('tiendaIdProd') idTienda: number,
                   @Body('idProducto') idProducto: number, @Request() request) {

        this.productosService.eliminarPorId(Number(idProducto));

        res.redirect('/examen/tienda/gestionarProductos/'+idTienda);
    }
    @Get('/buscarProd/:id')
    buscarProductos( @Param() params,@Res() res,@Request() request){
        const cookieSeg = request.signedCookies;
        console.log(id);
        return res.redirect('/examen/tienda/buscarProducto'+id)
        }



    @Post('buscarProducto')
    buscarProducto(@Param() params,@Res() res,
                 @Body('busquedaProductos') busquedaProductos: string, @Request() request) {
        const cookieSeg = request.signedCookies;
         arregloProductoBusqueda=this.productosService.buscarPorNombre(busquedaProductos,id);
        console.log('impiendo arreglo productos:',arregloProductoBusqueda);

        if(arregloProductoBusqueda!=null){
            res.redirect('/examen/tienda/busquedaProducto/'+id);
        }else{
            res.redirect('/examen/tienda/gestionarProductos/'+id);
        }
    }


}
let id:number;
let arregloProductoBusqueda:Productos[];