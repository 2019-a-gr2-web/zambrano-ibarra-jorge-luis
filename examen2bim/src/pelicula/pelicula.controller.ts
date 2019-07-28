import { Controller, Get, Response, Request, Headers, Post, Body, Res, Param, Session } from '@nestjs/common';
import {PeliculaService} from "./pelicula.service";
import { PeliculaEntity } from './pelicula.entity';
import { PeliculaCreateDto } from './dto/pelicula.create.dto';
import { ActorService } from '../actor/actor.service';
import { validate } from 'class-validator';
import { PeliculaUpdateDto } from './dto/pelicula.update.dto';
import { Like } from 'typeorm';


@Controller('examen/pelicula')
export class PeliculaController {
  constructor(private readonly peliculaService: PeliculaService,
              private readonly actorService:ActorService) {
  }
  @Get('/listarHijo/:id')
  async gestionarHijos(
    @Param('id') id:number,
    @Res() res,
    @Session() session) {

    if (session.usuario) {
      try{
        var padre = await this.actorService.buscar(id);
        var hijos = await this.peliculaService.listar({
          where:[
            {actor:padre}
          ]});
        console.log(hijos);
      }catch (e) {
        console.error(e);
      }
      return res.render('pelicula/gestionarPeliculas',{
        id:id,
        hijos:hijos,
        nombre:session.usuario.nombreUsuario})
    }
    else{
      return res.redirect('/examen/inicioSesion');
    }

  }
  /*
  @Get('/busquedaPokemon/:id')
  busquedaHijos(
    @Param() params,
    @Headers() headers,
    @Request() request,
    @Response() response) {
    const cookieSeg = request.signedCookies;
    if (cookieSeg.nombreUsuario) {
     // return response.render('pelicula/gestionarIngredientes',{id:id,arregloIngredientes:arregloIngredientesBusqueda,nombre:cookieSeg.nombreUsuario})
    }
    else{
      return response.redirect('/examen/inicioSesion');
    }
  }


  */

  @Post('buscarHijo/:idPadre')
  async buscarPoke(
    @Param('idPadre') idPadre:number,
    @Body('busqueda') parametro,
    @Res() res,
    @Session() session
  ){
    console.log(parametro);
    if(parametro!=""){
      parametro = {
        where:[
          {idActor:idPadre,nombrePelicula:Like("%"+parametro+"%")},
          {idActor:idPadre,anioLanzamientoPelicula:Like("%"+parametro+"%")}
        ]
      };
      console.log(JSON.stringify(parametro));
      try{
        var hijos = await this.peliculaService.listar(parametro);
      }catch (e) {
        console.log(e);
      }
    }else{
      try {
        var hijos = await this.peliculaService.listar({
          where:[{
            idActor: idPadre
          }]
        });
      }catch (e) {
        console.error(e);
      }
    }
    console.log(hijos);
    return res.render('pelicula/gestionarPeliculas',{
      id:idPadre,
      hijos:hijos,
      nombre:session.usuario.nombreUsuario})
  }

  @Post('editarHijo/:idPeli')
  async editarPeli(
    @Res() res,
    @Body() hijo:PeliculaEntity,
    @Body('id') idPadre:number,
    @Session() session,
    @Param('idPeli') idPeli
  ){
    if(session.usuario){
      hijo.anioLanzamientoPelicula = Number(hijo.anioLanzamientoPelicula);
      hijo.ratingPelicula = Number(hijo.ratingPelicula);
      try{
        var hijoA= await this.peliculaService.buscar(idPeli);
        hijoA.anioLanzamientoPelicula = hijo.anioLanzamientoPelicula;
        hijoA.actoresPrincipalesPelicula = hijo.actoresPrincipalesPelicula;
        hijoA.sinopsisPelicula = hijo.sinopsisPelicula;
        hijoA.ratingPelicula = hijo.ratingPelicula;
        hijoA.nombrePelicula = hijo.nombrePelicula;
        const padre = await this.actorService.buscar(idPadre);
        hijo.actor=padre;
        hijoA.actor= hijo.actor;
      }catch (e) {
        console.error(e);
      }
      const hijoValido = new PeliculaUpdateDto();
      hijoValido.idPelicula = hijoA.idPelicula;
      hijoValido.nombrePelicula = hijoA.nombrePelicula;
      hijoValido.anioLanzamientoPelicula = hijoA.anioLanzamientoPelicula;
      hijoValido.sinopsisPelicula = hijoA.sinopsisPelicula;
      hijoValido.actoresPrincipalesPelicula = hijoA.actoresPrincipalesPelicula;
      hijoValido.actor = hijoA.actor;
      hijoValido.ratingPelicula = hijoA.ratingPelicula;
      console.log(hijoA);

      try{
        const errores = await validate(hijoValido);
        if(errores.length>0){
          console.log("Errores");
          console.log(errores);
          const pokemons = await this.peliculaService.listar();
          return res.redirect('/examen/pelicula/listarHijo/'+idPadre);
        }else{
          const respuesta = await this.peliculaService.actualizar(+idPeli,hijoA);
          const pokemons = await this.peliculaService.listar();
          console.log(respuesta);
          return res.redirect('/examen/pelicula/listarHijo/'+idPadre);
        }
      }catch (e) {
        console.error(e);
      }
    }else{
      return res.redirect('/examen/inicioSesion');
    }
  }

  @Get('/crearHijo/:id/:idPeli')
  async crearingrediente(
    @Param('idPeli') idPeli,
    @Param('id') id,
    @Res() res,
    @Session() session){
    if (session.usuario) {
      if(idPeli!=0){
        try {
          var hijo = await this.peliculaService.buscar(idPeli);
        }catch (e) {
          console.error(e);
        }
      }
      res.render('pelicula/crearPelicula',{
        nombre:session.usuario.nombreUsuario,
        id:id,
        idPoke:idPeli,
        hijo:hijo
      })

    }
    else{
      return res.redirect('/examen/inicioSesion');
    }


  }
  @Post('/crearHijo')
  async crearingredientePost(
    @Body() hijo:PeliculaEntity,
    @Body('id') idPadre:number,
    @Res() res,
  ){
    hijo.anioLanzamientoPelicula = Number(hijo.anioLanzamientoPelicula);
    hijo.ratingPelicula = Number(hijo.ratingPelicula);
    hijo.precioPelicula = Number(hijo.precioPelicula);
    try{
      var padre = await this.actorService.buscar(idPadre);
      hijo.actor = padre;
    }catch (e) {
      console.error(e);
    }

    const hijoValido = new PeliculaCreateDto();
    hijoValido.idPelicula = hijo.idPelicula;
    hijoValido.nombrePelicula = hijo.nombrePelicula;
    hijoValido.anioLanzamientoPelicula = hijo.anioLanzamientoPelicula;
    hijoValido.sinopsisPelicula = hijo.sinopsisPelicula;
    hijoValido.actoresPrincipalesPelicula = hijo.actoresPrincipalesPelicula;
    hijoValido.actor = hijo.actor;
    hijoValido.ratingPelicula = hijo.ratingPelicula;

    try{
      const errores = await validate(hijoValido);
      if(errores.length>0){
        console.log("ERRORES");
        console.log(errores);
        res.redirect("/examen/pelicula/listarHijo/"+idPadre);
      }else{
        const respuesta = await this.peliculaService.crear(hijo);
        console.log(hijo);
        console.log(respuesta);
        res.redirect("/examen/pelicula/listarHijo/"+idPadre);
        }
    }catch (e) {
      console.error(e);
    }
  }

  @Post('eliminarHijo')
  async eliminaringrediente(
    @Param() params,
    @Res() res,
    @Body('idPoke') idPoke: number,
    @Body('id') id:number,
    @Session() session
    ){
    if (session.usuario) {
      try{
        await this.peliculaService.eliminarPorId(idPoke);
      }catch (e) {
        console.error(e);
      }
      res.redirect('/examen/pelicula/listarHijo/'+id);
    }
    else{
      return res.redirect('/examen/inicioSesion');
    }
  }
  /*
  @Get('/buscarIngred/:id')
  buscarIngredientes( @Param() params,@Res() res,@Request() request){
    const cookieSeg = request.signedCookies;
    console.log(id);
    if (cookieSeg.nombreUsuario) {
      return res.redirect('/examen/actor/buscarIngrediente'+id)
    }
    else{
      return res.redirect('/examen/inicioSesion');
    }
  }

  @Post('buscarIngrediente')
  buscaringrediente(@Param() params,@Res() res,
                 @Body('busquedaIngredientes') busquedaIngredientes: string, @Request() request) {
    const cookieSeg = request.signedCookies;
    arregloIngredientesBusqueda=this.ingredientesService.buscarPorNombre(busquedaIngredientes,id);

    if(busquedaIngredientes!=null){
      if (cookieSeg.nombreUsuario) {
        res.redirect('/examen/actor/busquedaIngrediente/'+id);
      }
      else{
        return res.redirect('/examen/inicioSesion');
      }
    }else{
      if (cookieSeg.nombreUsuario) {
        res.redirect('/examen/actor/gestionarIngredientes/'+id);
      }
      else{
        return res.redirect('/examen/inicioSesion');
      }
    }
  }*/

  @Get('hijo/:id')
  async getHijo(
    @Res() res,
    @Session() session,
    @Param('id') id:number
  ){
    try {
      console.log(id);
      var hijo= await this.peliculaService.buscar(id);
      console.log(hijo);
    }catch (e) {
      console.error(e);
      res.send({error:'ERROR'});
    }
    res.send(hijo);
  }

  @Get('hijos/:idPadre')
  async listarHijos(
    @Res() res,
    @Session() session,
    @Param('idPadre') idPadre
  ){
    try {
      var padre = await this.actorService.buscar(idPadre);
      var hijos= await this.peliculaService.listar({where:[{actor:padre}]});
    }catch (e) {
      console.error(e);
      res.send({error:'ERROR'});
    }
    res.send(hijos);
  }


}
