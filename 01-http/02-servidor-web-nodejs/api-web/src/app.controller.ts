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
        if(cookies.micookie){
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
    @Get('/inicio')
    inicio(@Response() res){
      return res.render('inicio')
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


function holaMundo(){
    console.log('Hola mundo');
}
const respuestHolaMundo= holaMundo();
console.log('Resp hola mundo: ', respuestHolaMundo);

function suma(a:number,b:number):number{
   return a+b;
}
const respuestaSuma= suma(1,2);
console.log('Resp suma: ', respuestaSuma);
//condicionales
//truty
//falsy
if(true){//truty
    console.log('verdadero');
}else{
    console.log('falso');
}

if(""){//falsy
    console.log('verdadero');
}else{
    console.log('falso "" ');
}
if("a"){//truty
    console.log('verdadero "a"');
}else{
    console.log('falso "a" ');
}

if(0){//falsy
    console.log('verdadero "0"');
}else{
    console.log('falso "0" ');
}

if("0"){//truty
    console.log('verdadero "0"');
}else{
    console.log('falso "0" ');
}

if("-1"){//truty
    console.log('verdadero "0"');
}else{
    console.log('falso "0" ');
}

if("1"){//falsy
    console.log('verdadero "0"');
}else{
    console.log('falso "0" ');
}

if(undefined){//falsy
    console.log('verdadero undef');
}else{
    console.log('falso undef ');
}

if(null){//falsy
    console.log('verdadero null');
}else{
    console.log('falso null ');
}

if({}){//truty
    console.log('verdadero "{}"');
}else{
    console.log('falso "{}" ');
}

//operadores de arreglos
 //los arreglos pueden tener lo que sea
     const arreglo= [
         function () {return 'o'},
         1,
         'C',
         true,
         {},
         []
     ];
const arreglosNumeros = [1,2,3,4,5,6];
// 1) imprimir en consola todos los elementos
// 2) sume dos a los pares y 1 a los impares
// 3) encuentre si hay el numero 4
// 4) filtren los números menores a 5
// 5) todos los valores positivos
// 6) algun valor menor a 2
// 7) sumen todos los valores
// 8) resten todos los valores de 100

//1.1) sumen 10 a todos
//1.2) filtren a los mayores a 15
//1.3) si hay algún numero mayor a 30 (true or false)
const arreglosNumerosForEach = [1,2,3,4,5,6];

const rforeach= arreglosNumerosForEach.forEach(function (valorActual,indice,arreglo) {
       console.log(`Valor: ${valorActual}`);
       console.log(`Indice: ${indice}`);
        console.log(`Arreglo: ${arreglo}`);
    });

//1)
const r2foreach= arreglosNumerosForEach.forEach((arreglo)=>

    console.log(`Arreglo: ${arreglo}`)
);



//2
const arreglosNumerosMap= [1,2,3,4,5,6];
const rMap=arreglosNumerosMap
    .map(//devolver el nuevo valor de ese elemento
        (valorActual) => {
            const esPar = valorActual%2==0;
            if(esPar){
                const nuevoValor = valorActual+2;
                return nuevoValor;
            } else{
                const nuevoValor = valorActual+1;
                return nuevoValor;
            }
        }
        );
console.log(`Respuesta Map: ${rMap}`);
//3)
const arreglosNumerosFind= [1,2,3,4,5,6];
const rFind = arreglosNumerosFind.
find(
    (valorActual)=>{
    return valorActual==4;

}

);
console.log(`Respuesta Find: ${rFind}`);
//4)
const arreglosNumerosFilter= [1,2,3,4,5,6];
const rFilter=arreglosNumerosFilter.
filter(
    (valorActual)=>{
        return valorActual<5;
    }

);
console.log(`Respuesta Filter: ${rFilter}`);
//45 casi se daña