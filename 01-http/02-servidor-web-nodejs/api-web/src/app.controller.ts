import {Controller, Delete, Get, Header, HttpCode, Post, Put, Headers} from '@nestjs/common';
import { AppService } from './app.service';
import {HEADERS_METADATA} from '@nestjs/common/constants';

// http://192.168.1.10:3000''/mascotas/crear
@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello-world')
  helloWorld(): string {
    return 'Hello world';
  }
  @Post('/hola-mundo')  // METODO HTTP
  holaMundo() {
    return 'Hola mundo';
  }
  @Put('/salut-monde')
  salutMonde() {
      return 'salut monde';
  }
  @Delete('/hallo-welt')
  halloWelt() {
        return 'Hallo Welt';
  }
  @Get('/adivina')
  adivina(@Headers() headers): string {
      console.log('Headers', headers);
      const numeroDeCabecera = Number(headers.numero);
      const numeroRandomico = Math.round(Math.random() * 10);
      if(numeroDeCabecera == numeroRandomico){
          return'ok';
      }else{
          return ':c';
      }

      return 'ok';
  }

}
/*
@NombreDecoradorClase() // Decorador -> FUNCION
class usuario{
  @Atributo() // Decorador
  atributoPublico; // Public
  private atributoPrivado;
  protected atributoProtegido;
  constructor(@Parametro() atributoPublico,
              @OtroParametro() atributoPrivado,
              @OtroOtroParametro() atributoProtegido){
    this.atributoPublico = atributoPublico;
    this.atributoPrivado = atributoPrivado;
    this.atributoProtegido = atributoProtegido;
  }
  @MetodoA()
  public metodoPublico(@ParametroA() a){}
  @MetodoB()
  private metodoPrivado(){}
  protected metodoProtegido(){}
}
*/
const json = [
    {
        "nombre": 'jorge',
        "edad": 25,
        "casado": false,
        "sueldo": 10.21,
        "hijos": null,
        "mascotas": ['cachetas', 1, 1.1, false, null, {"nombre": 'cachetes'}]
    }
];
let objeto: any= {
    propiedad: 'valor',
    propiedadDos: 'valor2'
};
objeto.propiedad
objeto.propiedadDos

objeto.propiedadTres = 'valor3';
objeto['propiedadTres']= 'valor 3';
delete objeto.propiedadTres;
objeto.propiedadTres=undefined;