import {Body, Controller, Get, Param, Post, Query, Res} from '@nestjs/common';
import {CanchaService} from "./cancha.service";

import {Like} from "typeorm";

import {validate} from "class-validator";
import {CanchaEntity} from "./cancha.entity";
import {CanchaCreateDto} from "./dto/cancha.create.dto";


@Controller('aventura/cancha')
export class CanchaController{
    constructor(private readonly _canchaServices:CanchaService){

    }

    @Get('lista')
    async listaCancha(@Res() res) {
        const arregloCancha = await this._canchaServices.buscar();
        res.render('cancha/lista-cancha', {arregloCancha: arregloCancha})
    }

     @Get('/crear')
    crear(
        @Res() res,
    ){
        res.render('cancha/crear-editar-cancha');
    }

    @Get('/buscar')
    async buscar(
        @Res() res,
    ){
        const arregloCancha = await this._canchaServices.buscar();
        res.render('cancha/lista-cancha', {arregloCancha: arregloCancha})
    }

    @Get('/buscarNumero')
    async buscarNumero(
        @Res() res,
        @Query('numeroCancha') numeroCancha: string,
        @Query('busquedaCancha') busquedaCancha: string,
    ) {
        let arregloCancha: CanchaEntity[];
        console.log(busquedaCancha);
        if (busquedaCancha) {

            const consulta = {
                where: [
                    {
                        numeroCancha: Like(`%${busquedaCancha}%`)
                    }
                ]
            };
            arregloCancha = await this._canchaServices.buscar(consulta);
        }
        else {
            arregloCancha = await this._canchaServices.buscar();
        }

        res.render('cancha/lista-cancha', {arregloCancha: arregloCancha})
    }


    @Post('crear-cancha')
    async crearCanchaPost(
        @Body() cancha: CanchaEntity,
        @Res() res
    ) {

        let canchaAAValidar = new CanchaCreateDto();

        canchaAAValidar.descripcionCancha = cancha.descripcionCancha;
        canchaAAValidar.numeroCancha = Number(cancha.numeroCancha);
        canchaAAValidar.metroscCancha = Number(cancha.metroscCancha);
        canchaAAValidar.precioCancha = Number(cancha.precioCancha);


        console.log(cancha);
        try {
            const errores = await validate(canchaAAValidar);
            if (errores.length > 0) {
                console.error(errores);

            } else {

                const respuestaCrear = await this._canchaServices
                    .crear(cancha); // Promesa

                console.log('RESPUESTA: ', respuestaCrear);
                res.redirect('/aventura/cancha/lista');


            }
        } catch
            (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500});
        }




    }
    @Post('eliminar')
    async borrar(
        @Body('idCancha') idCancha: number,
        @Res() response
    ) {
        try {
            const canchaABuscar = await this._canchaServices.buscarPorId(+idCancha);
            await this._canchaServices.eliminarId(Number(idCancha));
            response.redirect('/aventura/cancha/lista');
        }
        catch
            (e) {
            console.error(e);
            response.status(500);
            response.send({mensaje: 'Error', codigo: 500});
        }
    }

    @Get('editar/:idCancha')
    async actualizarCancha(
        @Param('idCancha') idCancha: string,
        @Res() response

    ) {

        console.log((idCancha));
        const canchaAActializar = await this
            ._canchaServices
            .buscarPorId(Number(idCancha));
        console.log('Cancha', canchaAActializar.descripcionCancha);

        return response.render(
            'cancha/crear-editar-cancha',
            {
                cancha: canchaAActializar})



    }


    @Post('actualizar-cancha/:idCancha')
    async actualizarCanchaForm(
        @Param('idCancha') idCancha: string,
        @Res() response,
        @Body() cancha: CanchaEntity
    ) {
        cancha.idCancha = +idCancha;

        await this._canchaServices.actualizar(+idCancha, cancha);



        response.redirect('/aventura/cancha/lista');

    }


}
