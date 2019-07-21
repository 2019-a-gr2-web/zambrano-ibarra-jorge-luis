import {
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Post,
    Put,
    Headers,
    Query,
    Param,
    Body,
    Request,
    Response,
    Session, Res, Render, UseInterceptors, UploadedFile
} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';
import {FileInterceptor} from "@nestjs/platform-express";
// http://192.168.1.10:3000''/mascotas/crear
// @ts-ignore
// @ts-ignore
@Controller('/api')
export class AppController {

    arrelgoUsuario =[];
    constructor(private readonly appService: AppService) {}

    @Get('session')
    session(
        @Query('nombre') nombre,
        @Session() session
    ){
        console.log(session);
        session.autenticado = true;
        session.nombreUsuario = nombre;
        return 'ok';
    }

    @Get('/login')
    loginVista(
        @Res() res
    ){

        res.render('login');
    }

    @Post('/login')
    login(
        @Body() usuario,
        @Session() session,
        @Res() res
    ){
        if(usuario.username === 'jorge' && usuario.password === '12345678'){
            //    QUE HACEMOS
            session.username = usuario.username;
            res.redirect('/api/protegida');
        }else{
            res.status(400);
            res.send({mensaje:'Error login',error:400})
        }
    }

    @Get('/protegida')
    protegida(
        @Session() session,
        @Res() res
    ){
        if(session.username){
            res.render('protegida',{
                nombre:session.username});
        }else{
            res.redirect('/api/login');
        }
    }
    @Get('logout')
    logout(
        @Res() res,
        @Session() session,
    ){
        session.username = undefined;
        session.destroy();
        res.redirect('/api/login');
    }




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
                    signed: true,
                    secure: true
                });
            return response.send('ok');
        }else{
            return response.send(':c');
        }
        //return 'Ok';
    }
    @Get('/peliculas')
    inicio(@Response() res){
        return res.render('peliculas/estilos',{

        })
    }
    @Get('/deber')
    estilos(@Response() res){
        return res.render('peliculas/deber2',{

        })
    }

    @Get('/subirArchivo/:idTrago')
    @Render('archivo')
    subirArchivo(@Param('idTrago') idTrago
                 ){
        return{
            idTrago: idTrago
        };

    }
    @Post('/subirArchivo/:idTrago')
    @UseInterceptors(
        FileInterceptor('imagen',
            {
                dest: __dirname+'/../archivos'
            }
            )
    )
    subirArchivoPost(@Param('idTrago') idTrago,
                     @UploadedFile() archivo
    ){
            console.log(archivo);
            return {mensaje: 'ok'};

    }

    @Get('descargarArchivo/:idTrago')
    descargarArchivo(
        @Res() res,
        @Param('idTrago') idTrago
    ) {
        const originalname = '1546ce23-f9c8-4014-879b-8002ea3cca7c.jpg';
        const path ='D:\\Documentos\\Github\\web-zambrano-ibarra-jorge-luis\\01-http\\02-servidor-web-nodejs\\api-web\\archivos\\311908214d36e100193e4450072a4e58'
        res.download(path, originalname);
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
  publico metodoPublico(@ParametroA() a){}
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
//45 casi se daña x2
//5
const arreglosNumerosEvery= [1,2,3,4,5,6];
const rEvery=arreglosNumerosEvery.
every(
    (valorActual)=>{
        return valorActual>0;
    }

);
console.log(`Respuesta Every: ${rEvery}`);

//6
const arreglosNumerosSome= [1,2,3,4,5,6];
const rSome=arreglosNumerosSome.
some(
    (valorActual)=>{
        return valorActual<2;
    }

);
console.log(`Respuesta Some: ${rSome}`);

const arreglosNumerosReduce= [1,2,3,4,5,6];
const valorDondeEmpiezaCalculo=100;
const rReduce=arreglosNumerosReduce.
reduce(
    (acumulado,valorActual)=>{
        return acumulado+ valorActual;
    },
    valorDondeEmpiezaCalculo

);
console.log(`Respuesta Reduce: ${rReduce}`);

//<4
//10%+5
//>=4
//15%+
const arreglosNumerosReduce1= [1,2,3,4,5,6];
const valorDondeEmpiezaCalculo1=0;
const rReduce1=arreglosNumerosReduce1.
reduce(
    (acumulado,valorActual)=>{
        if(valorActual<4)
            return acumulado+ valorActual+(valorActual*0.1)+5;
        else{
            return acumulado+ valorActual+(valorActual*0.15)+3;
        }
    },
    valorDondeEmpiezaCalculo1
);
console.log(`Respuesta Reduce1: ${rReduce1}`);

const arreglosNumerosReduce2= [1,2,3,4,5,6];
const valorDondeEmpiezaCalculo2=100;
const rReduce2=arreglosNumerosReduce2.
reduce(
    (acumulado,valorActual)=>{
        return acumulado- valorActual;
    },
    valorDondeEmpiezaCalculo

);
console.log(`Respuesta Reduce2: ${rReduce2}`);


const arregloEjercicio=[1,2,3,4,5,6];
const respEejercicio= arregloEjercicio.map((valorActual)=>{
    return valorActual+10;
})
    .filter((valorActual)=>{
        return valorActual>15;
    }).some((valorActual)=>{
        return valorActual>30;
    });
console.log(`Respuesta Ejercicio: ${respEejercicio}`);