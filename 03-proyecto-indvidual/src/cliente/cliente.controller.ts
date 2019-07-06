import {Controller, Get, Param, Post, Query, Res} from '@nestjs/common';

import {ClienteService} from "./cliente.service";
import {Tragos} from "../../../01-http/02-servidor-web-nodejs/api-web/src/tragos/interfaces/tragos";
import {TragosCreateDto} from "../../../01-http/02-servidor-web-nodejs/api-web/src/tragos/dto/tragos.create.dto";
import {Body} from "@nestjs/common/decorators/http/route-params.decorator";
import {Cliente} from "./interfaces/cliente";
import {ClienteCreateDto} from "./dto/cliente.create.dto";
import {validate} from "class-validator";
import {ClienteEntity} from "./cliente.entity";
import {Like} from "typeorm";


@Controller('aventura/cliente')
export class ClienteController{
    constructor(private readonly _clienteServices:ClienteService){

    }
    @Get('lista')
    async listaCliente(@Res() res) {
        const arregloCliente = await this._clienteServices.buscar();
        res.render('cliente/lista-cliente', {arregloCliente: arregloCliente})
    }

    @Get('/menu')
    inicio(
        @Res() res,
    ){
        res.render('cliente/menu-cliente');
    }

    @Get('/crear')
    crear(
        @Res() res,
    ){
        res.render('cliente/crear-editar-cliente');
    }

    @Get('/buscar')
    async buscar(
        @Res() res,
    ){
        const arregloCliente = await this._clienteServices.buscar();
        res.render('cliente/lista-cliente', {arregloCliente: arregloCliente})
    }

    @Get('/buscarCedula')
    async buscarCedula(
        @Res() res,
        @Query('cedulaCliente') cedulaCliente: string,
        @Query('busquedaCliente') busquedaCliente: string,
    ) {
        let arregloCliente: ClienteEntity[];
        console.log(busquedaCliente);
        if (busquedaCliente) {

            const consulta = {
                where: [
                    {
                        cedulaCliente: Like(`%${busquedaCliente}%`)
                    }
                ]
            };
            arregloCliente = await this._clienteServices.buscar(consulta);
        }
            else {
            arregloCliente = await this._clienteServices.buscar();
            }

            res.render('cliente/lista-cliente', {arregloCliente: arregloCliente})
        }


    @Post('crear-cliente')
    async crearClientePost(
        @Body() cliente: ClienteEntity,
        @Res() res
    ) {

        let clienteAValidar = new ClienteCreateDto();

        clienteAValidar.nombreCliente = cliente.nombreCliente;
        clienteAValidar.cedulaCliente = (cliente.cedulaCliente);
        clienteAValidar.telefonoCliente = Number(cliente.telefonoCliente);
        clienteAValidar.direccionCliente = cliente.direccionCliente;


        console.log(cliente);
        try {
            const errores = await validate(clienteAValidar);
            if (errores.length > 0) {
                console.error(errores);

            } else {

                const respuestaCrear = await this._clienteServices
                    .crear(cliente); // Promesa

                console.log('RESPUESTA: ', respuestaCrear);
                res.redirect('/aventura/cliente/lista');


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
        @Body('idCliente') idCliente: number,
        @Res() response
    ) {
        try {
            const clienteAbuscar = await this._clienteServices.buscarPorId(+idCliente);
            await this._clienteServices.eliminarId(Number(idCliente));
            response.redirect('/aventura/cliente/lista');
        }
        catch
            (e) {
            console.error(e);
            response.status(500);
            response.send({mensaje: 'Error', codigo: 500});
        }
    }

    @Get('editar/:idCliente')
    async actualizarCliente(
        @Param('idCliente') idCliente: string,
        @Res() response

    ) {

        console.log((idCliente));
        const clienteAActualizar = await this
            ._clienteServices
            .buscarPorId(Number(idCliente));
        console.log('Cliente', clienteAActualizar.nombreCliente);

        return response.render(
            'cliente/crear-editar-cliente',
            {
                cliente: clienteAActualizar})



    }


    @Post('actualizar-cliente/:idCliente')
    async actualizarClienteForm(
        @Param('idCliente') idCliente: string,
        @Res() response,
        @Body() cliente: ClienteEntity
    ) {
        cliente.idCliente = +idCliente;

        await this._clienteServices.actualizar(+idCliente, cliente);



        response.redirect('/aventura/cliente/lista');

    }

}
