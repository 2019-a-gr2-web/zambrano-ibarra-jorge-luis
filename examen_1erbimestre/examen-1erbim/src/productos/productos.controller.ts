import {Controller, Get, Response, Request, Headers, Post, Body, Res, Param} from '@nestjs/common';
import {ProductosService} from "./productos.service";
import {Productos} from "./interfaces/productos";

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
        if (cookieSeg.nombreUsuario) {

            return response.render('Productos/gestionarproductos',{id:id,arregloProductos:arregloProductos,nombre:cookieSeg.nombreUsuario})

        }
        else{
            return response.render('login');
        }

    }
    @Get('/busquedaProducto/:id')
    busquedaHijos(@Param() params, @Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {
        id= Number(params.id);
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {

            return response.render('Productos/gestionarproductos',{id:id,arregloProductos:arregloProductoBusqueda,nombre:cookieSeg.nombreUsuario})

        }
        else{
            return response.render('login');
        }


    }


    @Get('/crearProducto/:id')
    crearProducto( @Param() params,@Res() res,@Request() request){
        const cookieSeg = request.signedCookies;
        console.log(id);

        if (cookieSeg.nombreUsuario) {

            return res.render('Productos/crearproductos',{
                nombre:cookieSeg.nombreUsuario,
                id:id
            })

        }
        else{
            return res.render('login');
        }



    }
    @Post('/crearProducto')
    crearProductoPost(
        @Body() producto:Productos,
        @Res() res,
        @Param() params,
        @Request() request
    ){
        const cookieSeg = request.signedCookies;
        producto.precioProducto=Number(producto.precioProducto);
        producto.numeroProducto=Number(producto.numeroProducto);
        producto.aniosGarantiaProducto=Number(producto.aniosGarantiaProducto);
        producto.tiendaId=Number(producto.tiendaId);
        producto.fechaLanzamientoProducto =new Date(producto.fechaLanzamientoProducto);
        console.log(producto);
        this.productosService.crearProducto(producto);
        if (cookieSeg.nombreUsuario) {

            res.redirect('/examen/tienda/gestionarProductos/'+id);

        }
        else{
            return res.render('login');
        }


    }
    @Post('eliminarProductos')
    eliminarProducto(@Param() params,@Res() res,  @Body('tiendaIdProd') idTienda: number,
                   @Body('idProducto') idProducto: number, @Request() request) {

        const cookieSeg = request.signedCookies;
        this.productosService.eliminarPorId(Number(idProducto));
        if (cookieSeg.nombreUsuario) {

            res.redirect('/examen/tienda/gestionarProductos/'+idTienda);

        }
        else{
            return res.render('login');
        }


    }
    @Get('/buscarProd/:id')
    buscarProductos( @Param() params,@Res() res,@Request() request){
        const cookieSeg = request.signedCookies;
        console.log(id);
        if (cookieSeg.nombreUsuario) {

            return res.redirect('/examen/tienda/buscarProducto'+id)

        }
        else{
            return res.render('login');
        }

        }



    @Post('buscarProducto')
    buscarProducto(@Param() params,@Res() res,
                 @Body('busquedaProductos') busquedaProductos: string, @Request() request) {
        const cookieSeg = request.signedCookies;
         arregloProductoBusqueda=this.productosService.buscarPorNombre(busquedaProductos,id);
        console.log('impiendo arreglo productos:',arregloProductoBusqueda);

        if(busquedaProductos!=null){
            if (cookieSeg.nombreUsuario) {

                res.redirect('/examen/tienda/busquedaProducto/'+id);

            }
            else{
                return res.render('login');
            }

        }else{
            if (cookieSeg.nombreUsuario) {

                res.redirect('/examen/tienda/gestionarProductos/'+id);

            }
            else{
                return res.render('login');
            }

        }
    }


}
let id:number;
let arregloProductoBusqueda:Productos[];