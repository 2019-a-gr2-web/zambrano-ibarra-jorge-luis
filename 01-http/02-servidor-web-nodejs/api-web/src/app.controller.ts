import {Controller, Delete, Get, Header, HttpCode, Post, Put, Headers, Query, Param, Body, Request, Response} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';
// http://192.168.1.10:3000''/mascotas/crear
// @ts-ignore
// @ts-ignore
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
  @Get('/consultar')
   consultar(@Query() queryParams){
      console.log(queryParams)
      if (queryParams.nombre){

          return `Hola ${queryParams.nombre}`

      }else{
          return 'Hola extraño'
      }
  }
    @Get('/ciudad/:idCiudad')
    ciudad(@Param() parametrosRuta){
        console.log(parametrosRuta);
        switch (parametrosRuta.idCiudad.toLowerCase()){
            case 'quito':
                return 'Que fueff';
            case 'manabi':
                return 'Haaaabla bieeeen ';
            default:
                return 'Buenas tardes'
        }
    }
    @Post('registroComida')
    registroComida(@Body() parametrosCuerpo, @Response() response){

      console.log(parametrosCuerpo);
      if (parametrosCuerpo.nombre && parametrosCuerpo.cantidad){
          const cantidad= Number(parametrosCuerpo.cantidad);
          if (cantidad>1) {
              response.set('Premio', 'Fanesca');
          }
          return response.send({mensaje: 'Registro Creado'})
      }else{
          return response.status(400)
              .send({
                      mensaje:'ERROR, no envia nombre o cantidad',
                  error: 400
              });
      }


    }
    @Get('/semilla')
    semilla(@Request() request, @Response() response) {
        console.log(request.cookies);
        const cookies = request.cookies;
        const esquemaValidacionNumero= Joi
            .object()
            .keys({
            numero: Joi.number().integer().required()

        });
        const objetoVladicacion={
            numero: cookies.numero
        };
        const resultado = Joi.validate(objetoVladicacion,esquemaValidacionNumero);
        if(resultado.error){
            console.log('resultado: ', resultado);
        }else{
            console.log('Número valido');
        }
        const cookieSegura= request.signedCookies.fechaServidor;
        if(cookieSegura){
            console.log('Cookie segura');
        }else{
            console.log('No es valida esta cookie');
        }
        const horafechaServidor= new Date();
        const minutos = horafechaServidor.getMinutes();
        horafechaServidor.setMinutes(minutos+1);
            response.cookie('fechaServidor', new Date().getTime(),
                {
                    //expires: horafechaServidor
                    signed: true
                });
            return response.send('ok');
        }else{
            return response.send(':c');
        }
        //return 'Ok';
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