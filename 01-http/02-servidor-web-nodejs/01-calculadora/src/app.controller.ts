import { Controller, Get, Headers, HttpCode, Post, Param, Put, Query, Delete, Response, Request, Body} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';
import {catchError} from "rxjs/operators";
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
    const cookie = request.cookies;
    response.cookie('usuario', 'Jorge Zambrano Suma');
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
      const suma = numero1 + numero2;
      return response.send({'resultado: ': `La suma es: ${suma}`, 'usuario: ': cookie.usuario});
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


}
