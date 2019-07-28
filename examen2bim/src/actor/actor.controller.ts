import {Controller, Get, Response, Request, Headers, Post, Body, Res, Session, Query} from '@nestjs/common';
import {ActorService} from "./actor.service";
import { PeliculaService } from '../pelicula/pelicula.service';
import { UsuarioService } from '../usuario/usuario.service';
import { ActorEntity } from './actor.entity';
import { ActorCrearDto } from './dto/actor.crear.dto';
import { validate } from 'class-validator';
import {UsuarioEntity} from "../usuario/usuario.entity";
import {Usuario} from "../usuario/interfaces/usuario";


@Controller('/examen')
export class ActorController {
  constructor(private readonly actorService: ActorService,
              private readonly peliculaService:PeliculaService,
              private readonly usuarioService:UsuarioService) {
  }

  @Post('login')
  async postAutenticar(@Body() body,
                       @Session() session,
                       @Res() res) {
    try{
    const usuario: Usuario = {nombreUsuario: body.nombre, passwordUsuario: body.passwd};
    const respuestaUsuario =  await this.usuarioService
        .listar(usuario);

    const valor:Usuario=respuestaUsuario.find(
        value => value.nombreUsuario==usuario.nombreUsuario
    );
    if(respuestaUsuario.length>0){
      session.usuario = respuestaUsuario[0];
      if(valor.tipoUsuario=="ADMIN"){
        res.redirect('/examen/bienvenido');
      }else if(valor.tipoUsuario=="USUARIO"){
        res.redirect('/examen/bienvenido');
      }else{
        res.redirect('/examen/bienvenido');
      }
    }else{
      res.redirect('/examen/inicioSesion');
    }}
    catch (e){

    }
  }

  @Post('/login1')
  async loginCookie1(
    @Res() res,
    @Body('nombre') nombre:string,
    @Body('passwd') passwd:string,
    @Session() session
  ){
    console.log(nombre);
    try {
      var usuarios = await this.usuarioService.listar(
        {
          where: [
            { nombreUsuario: nombre }
          ]
        });
      const valor = usuarios;
      console.log(usuarios);
      if (usuarios.length == 0) {
        console.log("No existe");
        return res.redirect('/examen/inicioSesion');

      } else {
        if (usuarios[0].passwordUsuario == passwd) {
          session.usuario = usuarios[0];
          console.log(session);
          const url='/examen/bienvenido?nombre='+usuarios[0].nombreUsuario;
          return res.redirect(url);
        } else {
          console.log("Credenciales incorrectas");
          return res.redirect('/examen/inicioSesion');
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
    @Get('/listarPadre')
    async gestionarPadres(
      @Session() session,
      @Res() res) {
      if (session.usuario) {
        try{
          var padres=await this.actorService.listar();
        }catch (e) {
          console.error(e);
        }
        return res.render('Actor/listaActor',{actores:padres,nombre:session.usuario.nombreUsuario})
      } else {
        return res.redirect('/examen/inicioSesion');
      }
    }


  @Post('/borrarCookie')
  borrarCookiemethod(
    @Session() session,
    @Res() res
  ) {
    session.usuario=undefined;
    session.destroy();
    res.redirect('/examen/inicioSesion')
  }

  @Get('/inicioSesion')
  inicioSesion(@Response() res){
    return res.render('login')
  }

  @Get('/bienvenido')
    bienvenido(
        @Res() res,
        @Session() session,
        @Query('nombre') nombre:string,
    ){
    console.log("AAAAAAAAAAAAAAAA");
        console.log(session);
        if (session.usuario ){
          if (session.usuario.nombreUsuario===nombre) {
            return res.render('paginaprincipal',{
                nombre:session.usuario.nombreUsuario,
                tipo:session.usuario.tipoUsuario
            })}

        else{
            return res.redirect('/examen/inicioSesion');
        }}
    }

  @Get('/crearActor')
  crearcomida(
    @Res() res,
    @Session() session){
    if (session.usuario) {
      return res.render('Actor/crearActor',{
        nombre:session.usuario.nombreUsuario
      })
    }
    else{
      return res.redirect('/examen/inicioSesion');
    }
  }

  @Post('/crearActor')
  async crearcomidaPost(
    @Body() actor:ActorEntity,
    @Res() res,
    @Request() request
  ){
    actor.fechaNacimientoActor = actor.fechaNacimientoActor ? new Date(actor.fechaNacimientoActor) : undefined;
    actor.numeroPeliculaActor = Number(actor.numeroPeliculaActor);
    if(actor.retiradoActor==undefined)
      actor.retiradoActor=false;
    else
      actor.retiradoActor=true;
    const actorValido = new ActorCrearDto();
    actorValido.nombreActor = actor.nombreActor;
    actorValido.apellidoActor = actor.apellidoActor;
    actorValido.fechaNacimientoActor = actor.fechaNacimientoActor;
    actorValido.numeroPeliculaActor = actor.numeroPeliculaActor;
    actorValido.retiradoActor = actor.retiradoActor;

    try{
      const errores = await validate(actorValido);
      if(errores.length>0){
        console.error(errores);
        res.redirect('/examen/listarPadre');
      }else{
        const respuesta = await this.actorService.crear(actor);
        console.log("Respuesta: ",respuesta);
        res.redirect('/examen/listarPadre');
      }
    }catch (e) {
      console.error(e);
    }
  }
  /*

  @Post('eliminar')
  eliminarcomida(@Res() res,
                 @Body('id') id: number, @Request() request) {
    const cookieSeg = request.signedCookies;
    this.comidaService.eliminarPorId(Number(id));
    if (cookieSeg.nombreUsuario) {
      res.redirect('/examen/gestionarComida');
    }
    else{
      return res.redirect('/examen/inicioSesion');
    }

  }


  @Post('/buscarcomida')
  buscarcomida(@Res() res,
               @Body('busquedaComida') busquedaComida: string, @Request() request) {
    const cookieSeg = request.signedCookies;
    arregloComidaBusqueda=this.comidaService.buscarPorNombre(busquedaComida);
    console.log(arregloComidaBusqueda);
    if(busquedaComida!=null){
      if (cookieSeg.nombreUsuario) {
        res.redirect('/examen/gestionComida');
      }
      else{
        return res.redirect('/examen/inicioSesion');
      }

    }else {
      if (cookieSeg.nombreUsuario) {
        res.redirect('/examen/gestionComida');
      }
      else{
        return res.redirect('/examen/inicioSesion');
      }

    }
  }*/

  @Get('padres')
  async padres(
    @Res() res,
  ){
    try{
      var padres = await this.actorService.listar()
    }catch (e) {
      console.error(e);
      res.send({error:'ERROR'});
    }
    res.send(padres);
  }

}
