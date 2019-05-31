import {Controller, Get, Response, Request, Headers, Post, Body, Res} from '@nestjs/common';
import {Tiendas} from "./interfacestiendas/tiendas";
import {isEmpty} from "@nestjs/common/utils/shared.utils";
import {TiendaService} from "./tienda.service";

@Controller('/examen')
export class TiendaController {
    constructor(private readonly tiendaService: TiendaService) {
    }
    @Post('/login')
    loginCookie1(@Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {
        const cookieSeg = request.signedCookies;
        if (!cookieSeg.nombreUsuario) {
            response.cookie('nombreUsuario', nombre,{signed: true});
            cookieSeg.nombreUsuario=nombre;
        }

        response.redirect('/examen/bienvenido')
    }
    @Post('/gestionarTiendas')
    gestionarTiendas(@Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {
        const cookieSeg = request.signedCookies;
        const arregloTiendas= this.tiendaService.bddTiendas;

        return response.render('Tiendas/gestiontiendas',{arregloTiendas:arregloTiendas,nombre:cookieSeg.nombreUsuario})
    }

    @Post('/borrarCookie')
    borrarCookiemethod(@Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {
        response.clearCookie("nombreUsuario");
        response.redirect('/examen/inicioSesion')
    }

    @Get('/inicioSesion')
    inicioSesion(@Response() res){
        return res.render('login')
    }
    @Get('/gestion')
    gestion(@Response() res){
        res.redirect('/examen/gestionarTiendas')
    }

    @Get('/bienvenido')
    bienvenido(@Response() res,  @Request() request){
        const cookieSeg = request.signedCookies;
        return res.render('paginaprincipal',{
            nombre:cookieSeg.nombreUsuario
        })


    }
    @Get('/crearTienda')
    crearTienda( @Res() res,@Request() request){
        const cookieSeg = request.signedCookies;
        return res.render('Tiendas/crearTienda',{
            nombre:cookieSeg.nombreUsuario
        })


    }
    @Post('/crearTienda')
    crearTiendaPost(
        @Body() tienda:Tiendas,
        @Res() res
    ){

        tienda.RUC=Number(tienda.RUC);

        tienda.fechaApertura =new Date(tienda.fechaApertura);
        tienda.matriz= Boolean(tienda.matriz);
        console.log(tienda);
        this.tiendaService.crearTienda(tienda);
        res.redirect('/examen/listaTiendas');
    }
    @Get('/listaTiendas')
    listarTragos(@Request() request, @Response() res , @Body('nombre') nombre: string){

        const cookieSeg = request.signedCookies;
        const arregloTiendas= this.tiendaService.bddTiendas;
        res.render('Tiendas/gestiontiendas', {arregloTiendas:arregloTiendas,nombre:cookieSeg.nombreUsuario})
    }

    @Post('eliminar')
    eliminarTienda(@Res() res,
                   @Body('id') id: number, @Request() request) {

        this.tiendaService.eliminarPorId(Number(id));
        res.redirect('/examen/listaTiendas');
    }


    @Post('/buscarTienda')
    buscarTienda(@Res() res,
                 @Body('busquedaTiendas') busquedaTiendas: string, @Request() request) {
        const cookieSeg = request.signedCookies;
        var arregloTiendas=this.tiendaService.buscarPorNombre(busquedaTiendas);
        console.log('impiendo arreglo tiendas:',arregloTiendas);
        if(busquedaTiendas!=null){
            res.render('gestiontiendas', {arregloTiendas:arregloTiendas,nombre:cookieSeg.nombreUsuario})
        }else {
            res.redirect('/examen/listaTiendas');
        }
    }

}
