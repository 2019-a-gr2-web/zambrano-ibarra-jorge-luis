import { Controller, Get, Headers, HttpCode, Post, Param, Put, Query, Delete, Response, Request, Body} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';
import {catchError} from "rxjs/operators";
import {printLine} from "tslint/lib/verify/lines";

@Controller('/calculadora')


export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/suma')

  @HttpCode(200)
  sumaJorge(@Headers() headers, @Response() response, @Request() request): string {
      const cookie2 = request.signedCookies;
      if(!cookie2.intento){
          response.cookie('intento', 100, {signed: true});
          console.log("COOKIE2: ",cookie2);
      }
      response.cookie('usuario', 'Jorge Zambrano Suma');

      const cookie1 = request.cookies;


      console.log("COOKIE1: ",cookie1);

      console.log('Headers', headers);
    const numero1 = Number(headers.numero1);
    const numero2 = Number(headers.numero2);
    const esquemaValidacionNumero = Joi
        .object()
        .keys({
          num1: Joi.number().integer().required(),
          num2: Joi.number().integer().required()
        });
    const objetoVladicacion = {
      num1: numero1,
      num2: numero2
    };
    const resultado = Joi.validate(objetoVladicacion, esquemaValidacionNumero);
    if (resultado.error) {

      return response.send("Error: Ingrese solo numeros");
    } else {



           if (resul<=0) {
               return response.send({
                   'resultado: ': `Resutlado: ${resul}`,
                   'usuario: ': cookie1.usuario,
                   'mensaje: ': 'Se le terminaron los puntos'
               });
           }else{
                //console.log(cookie2.intento);
                //resul= cookie2 - (numero1+ numero2);
                return response.send({
                'resultado: ': `Resutlado: ${resul}`,
                'usuario: ': cookie2.intento

           });
       }

    }





  }
  @Post('/resta')
  restaJorge(@Body() parametrosCuerpo, @Response() response, @Request() request): string {
    const cookie = request.cookies;
    response.cookie('usuario', 'Jorge Zambrano Resta');
    const numero1 = Number(parametrosCuerpo.numero1);
    const numero2 = Number(parametrosCuerpo.numero2);


    const esquemaValidacionNumero = Joi
        .object()
        .keys({
          num1: Joi.number().integer().required(),
          num2: Joi.number().integer().required()
        });
    const objetoVladicacion = {
      num1: numero1,
      num2: numero2
    };
    const resultado = Joi.validate(objetoVladicacion, esquemaValidacionNumero);
    if (resultado.error) {
      return response.send("Error: Ingrese solo numeros");
    } else {
      const resta= numero1-numero2;
      response.set('Resta', `${resta}`);
      return response.status(201).send({'resultado: ':`La resta es: ${resta}`, 'usuario: ': cookie.usuario});
    }



  }

  @Put('/multiplicacion')
  multiJorge(@Query() parametrosQuery, @Response() response, @Request() request): string {
    const cookie = request.cookies;
    response.cookie('usuario', 'Jorge Zambrano Multiplicacion');
    const numero1 = Number(parametrosQuery.numero1);
    const numero2 = Number(parametrosQuery.numero2);





    const esquemaValidacionNumero = Joi
        .object()
        .keys({
          num1: Joi.number().integer().required(),
          num2: Joi.number().integer().required()
        });
    const objetoVladicacion = {
      num1: numero1,
      num2: numero2
    };
    const resultado = Joi.validate(objetoVladicacion, esquemaValidacionNumero);
    if (resultado.error) {

      return response.send("Error: Ingrese solo numeros");
    } else {
      const mult= numero1*numero2;
      response.set('Multiplicacion', `${mult}`);
      return response.status(202).send({'resultado: ':`La multiplicacion es: ${mult}`, 'usuario:': cookie.usuario});
    }
  }


  @Delete('/division')
  division(@Query() parametrosQuery, @Headers() headers, @Response() response, @Request() request): string {
    const cookie = request.cookies;
    response.cookie('usuario', 'Jorge Zambrano Division');

    const numero1 = Number(headers.numero1);
    const numero2 = Number(parametrosQuery.numero2);

    const esquemaValidacionNumero = Joi
        .object()
        .keys({
          num1: Joi.number().integer().required(),
          num2: Joi.number().integer().min(1).required()
        });
    const objetoVladicacion = {
      num1: numero1,
      num2: numero2
    };
    const resultado = Joi.validate(objetoVladicacion, esquemaValidacionNumero);
    if (resultado.error) {

      return response.send("Error: Ingrese solo numeros o El segundo numero mayor a 0");
    } else {
      const division = numero1 / numero2;
      response.set('Division', `${division}`);
      return response.status(203).send({'resultado: ':`La division es: ${division}`,'usuario:': cookie.usuario});
    }



  }

//cambiar nombre de commit


}
var resul=1;
var get_cookies = function(request) {
    var cookies = {};
    request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
        var parts = cookie.match(/(.*?)=(.*)$/)
        cookies[ parts[1].trim() ] = (parts[2] || '').trim();
    });
    return cookies;
};