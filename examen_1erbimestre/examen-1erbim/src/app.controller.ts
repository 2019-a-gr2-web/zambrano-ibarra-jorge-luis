import {Controller, Get, Response, Request, Headers, Post, Body} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/examen')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
  @Post('/borrarCookie')
    borrarCookiemethod(@Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {
    response.clearCookie("nombreUsuario");
    response.redirect('/examen/inicioSesion')
  }

  @Get('/inicioSesion')
  inicioSesion(@Response() res){
    return res.render('login')
  }

  @Get('/bienvenido')
  bienvenido(@Response() res,  @Request() request){
      const cookieSeg = request.signedCookies;
      return res.render('paginaprincipal',{
      nombre:cookieSeg.nombreUsuario
    })


  }
}
