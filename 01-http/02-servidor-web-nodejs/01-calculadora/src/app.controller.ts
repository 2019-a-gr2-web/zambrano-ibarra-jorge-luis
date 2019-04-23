import { Controller, Get, Headers, HttpCode, Post, Param, Put, Query, Delete, Response, Request, Body} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';
const Joi= require('@hapi/joi');
@Controller('/calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/suma')
  @HttpCode(200)
  sumaJorge(@Headers() headers): string {
    console.log('Headers', headers);
    const numero1 = Number(headers.numero1);
    const numero2 = Number(headers.numero2);

    if (/^([0-9])*$/.test(numero1.toString())&&/^([0-9])*$/.test(numero2.toString())){
      const suma= numero1+numero2;
      return `La suma es: ${suma}`;
    }else {
      return "Error al ingresar los numeros";
    }

  }

  @Post('/resta')

  restaJorge(@Body() parametrosCuerpo, @Response() response): string {
    const numero1 = Number(parametrosCuerpo.numero1);
    const numero2 = Number(parametrosCuerpo.numero2);
    if (/^([0-9])*$/.test(numero1.toString())&&/^([0-9])*$/.test(numero2.toString())){
      const resta= numero1-numero2;
      response.set('Resta', `${resta}`);
      return response.status(201).send(`La resta es: ${resta}`);
    }else {
      return response.status(400).send("Error al ingresar los numeros");
    }

  }

  @Put('/multiplicacion')
  multiJorge(@Query() parametrosQuery, @Response() response): string {

    const numero1 = Number(parametrosQuery.numero1);
    const numero2 = Number(parametrosQuery.numero2);
    if (/^([0-9])*$/.test(numero1.toString())&&/^([0-9])*$/.test(numero2.toString())){
      const mult= numero1*numero2;
      response.set('Multiplicacion', `${mult}`);
      return response.status(202).send(`La multiplicacion es: ${mult}`);
    }else {
      return response.status(400).send("Error al ingresar los numeros");
    }


  }
  @Delete('/division')
  division(@Query() parametrosQuery, @Headers() headers, @Response() response): string {

    const numero1 = Number(headers.numero1);
    const numero2 = Number(parametrosQuery.numero2);
    if (/^([0-9])*$/.test(numero1.toString())&&/^([0-9])*$/.test(numero2.toString())) {
      if (numero2 == 0) {
        return response.status(400).send("No se puede dividir para 0");
      } else {
      const division = numero1 / numero2;
      response.set('Division', `${division}`);
      return response.status(203).send(`La division es: ${division}`);
    }
    }else {
      return response.status(400).send("Error al ingresar los numeros");
    }
  }


}
