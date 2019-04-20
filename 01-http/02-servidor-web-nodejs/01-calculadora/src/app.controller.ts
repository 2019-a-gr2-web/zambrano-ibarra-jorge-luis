import { Controller, Get, Headers, HttpCode, Post, Param} from '@nestjs/common';
import { AppService } from './app.service';

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
    const suma= numero1+numero2;
    return `La suma es: ${suma}`;
  }

  @Post('/resta/:numero/:numero1')
  @HttpCode(201)
  restaJorge(@Param() parametrosRuta): string {

    const numero1 = Number(parametrosRuta.numero);
    const numero2 = Number(parametrosRuta.numero1);
    const resta= numero1-numero2;
    return `La resta es: ${resta}`;
  }
  
}
