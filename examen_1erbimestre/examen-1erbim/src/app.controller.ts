import {Controller, Get, Response, Request, Headers, Post, Body, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {Tragos} from "../../../01-http/02-servidor-web-nodejs/api-web/src/tragos/interfaces/tragos";
import {Tiendas} from "./tiendas/tiendas";

@Controller('/examen')
export class AppController {
  constructor(private readonly appService: AppService) {
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
    const arregloTiendas= this.appService.bddTiendas;

    return response.render('gestiontiendas',{arregloTiendas:arregloTiendas,nombre:cookieSeg.nombreUsuario})
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
    return res.render('crearTienda',{
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
    console.log(tienda);
    this.appService.crearTienda(tienda);
    res.redirect('/examen/listaTiendas');
  }
  @Get('/listaTiendas')
  listarTragos(@Request() request, @Response() res , @Body('nombre') nombre: string){

    const cookieSeg = request.signedCookies;
    const arregloTiendas= this.appService.bddTiendas;
    res.render('gestiontiendas', {arregloTiendas:arregloTiendas,nombre:cookieSeg.nombreUsuario})
  }

}
