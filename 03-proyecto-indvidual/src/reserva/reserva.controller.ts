import {Body, Controller, Get, Param, Post, Query, Res} from '@nestjs/common';
import {ReservaService} from "./reserva.service";
import {ClienteEntity} from "../cliente/cliente.entity";
import {Like} from "typeorm";
import {ClienteCreateDto} from "../cliente/dto/cliente.create.dto";
import {validate} from "class-validator";
import {ReservaEntity} from "./reserva.entity";
import {ReservaCreateDto} from "./dto/reserva.create.dto";
import {ClienteService} from "../cliente/cliente.service";
import {CanchaEntity} from "../cancha/cancha.entity";
import {CanchaService} from "../cancha/cancha.service";



@Controller('aventura/reserva')
export class ReservaController{
    constructor(private readonly _reservaService:ReservaService, private readonly _clienteService:ClienteService, private readonly _canchaService:CanchaService ){

    }

    @Get('lista')
    async listaReserva(@Res() res) {
        const arregloReserva = await this._reservaService.mostrar();

        res.render('reserva/lista-reserva', {arregloReserva: arregloReserva})
    }


    @Get('/crear')
    crear(
        @Res() res,
    ){
        res.render('reserva/crear-editar-reserva');
    }

    @Get('/buscar')
    async buscar(
        @Res() res,
    ){
        const arregloReserva = await this._reservaService.mostrar();
        console.log('arreglo reserva', arregloReserva)
        res.render('reserva/lista-reserva', {arregloReserva: arregloReserva})
    }

    @Get('/buscarReserva')
    async buscarReserva(
        @Res() res,
        @Query('cedulaCliente') cedulaCliente: string,
        @Query('busquedaReserva') busquedaReserva: string,
    ) {
        let arregloReserva: ReservaEntity[];
        console.log(busquedaReserva);
        if (busquedaReserva) {

            const consulta = {
                where: [
                    {
                        cliente: Like(`%${busquedaReserva}%`)
                    }
                ]
            };
            arregloReserva = await this._reservaService.buscar(consulta);
        }
        else {
            arregloReserva = await this._reservaService.buscar();
        }

        res.render('reserva/lista-reserva', {arregloReserva: arregloReserva})
    }


    @Post('crear-reserva')
    async crearReservaPost(
        @Body() reserva: ReservaEntity,
        @Body('cliente') cliente: ClienteEntity,
        @Body('cancha') cancha: CanchaEntity,
        @Res() res
    ) {
        let clienteAbuscar: ClienteEntity[];

        const consulta = {
            where: [
                {
                    cedulaCliente: Like(`%${cliente}%`)
                }
            ]
        };
        clienteAbuscar = await this._clienteService.buscar(consulta);

        let canchaABuscar: CanchaEntity[];

        const consultaCancha = {
            where: [
                {
                    numeroCancha: Like(`%${cancha}%`)
                }
            ]
        };
        canchaABuscar = await this._canchaService.buscar(consultaCancha);


        reserva.cliente = clienteAbuscar[0]
        reserva.cancha=canchaABuscar[0]
        reserva.fechaReserva = reserva.fechaReserva ? new Date(reserva.fechaReserva) : undefined;
        let reservaValidar = new ReservaCreateDto();

        reservaValidar.fechaReserva=reserva.fechaReserva;
        reservaValidar.horaFinal=Number(reserva.horaFinal)
        reservaValidar.horaInicial=Number(reserva.horaInicial)


        console.log(reserva.cliente);
        console.log('cliente reserva',clienteAbuscar);
        console.log('cliente reserva1',reserva.cliente);
        try {
            const errores = await validate(reservaValidar);
            if (errores.length > 0) {
                console.error(errores);

            } else {

                const respuestaCrear = await this._reservaService
                    .crear(reserva); // Promesa

                console.log('RESPUESTA: ', respuestaCrear);
                res.redirect('/aventura/reserva/lista');


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
        @Body('idReserva') idReserva: number,
        @Res() response
    ) {
        try {
            const reservaABuscar = await this._reservaService.buscarPorId(+idReserva);
            await this._reservaService.eliminarId(Number(idReserva));
            response.redirect('/aventura/reserva/lista');
        }
        catch
            (e) {
            console.error(e);
            response.status(500);
            response.send({mensaje: 'Error', codigo: 500});
        }
    }

    @Get('editar/:idReserva')
    async actualizarReserva(
        @Param('idReserva') idReserva: string,
        @Res() response

    ) {

        console.log((idReserva));
        const reservaAActualizar = await this
            ._reservaService
            .buscarPorId(Number(idReserva));


        return response.render(
            'reserva/crear-editar-reserva',
            {
                reserva: reservaAActualizar})



    }





    @Post('actualizar-reserva/:idReserva')
    async actReserva(
        @Param('idReserva') idReserva: string,
        @Body() reserva: ReservaEntity,
        @Body('cliente') cliente: ClienteEntity,
        @Body('cancha') cancha: CanchaEntity,
        @Res() res
    ) {
        reserva.idReserva = +idReserva;
        let clienteAbuscar: ClienteEntity[];

        const consulta = {
            where: [
                {
                    cedulaCliente: Like(`%${cliente}%`)
                }
            ]
        };
        clienteAbuscar = await this._clienteService.buscar(consulta);

        let canchaABuscar: CanchaEntity[];

        const consultaCancha = {
            where: [
                {
                    numeroCancha: Like(`%${cancha}%`)
                }
            ]
        };
        canchaABuscar = await this._canchaService.buscar(consultaCancha);


        reserva.cliente = clienteAbuscar[0]
        reserva.cancha=canchaABuscar[0]
        reserva.fechaReserva = reserva.fechaReserva ? new Date(reserva.fechaReserva) : undefined;
        let reservaValidar = new ReservaCreateDto();

        reservaValidar.fechaReserva=reserva.fechaReserva;
        reservaValidar.horaFinal=Number(reserva.horaFinal)
        reservaValidar.horaInicial=Number(reserva.horaInicial)


        console.log(reserva.cliente);
        console.log('cliente reserva',clienteAbuscar);
        console.log('cliente reserva1',reserva.cliente);
        try {
            const errores = await validate(reservaValidar);
            if (errores.length > 0) {
                console.error(errores);

            } else {

                const respuestaActualizar =  await this._reservaService.actualizar(+idReserva, reserva);


                console.log('RESPUESTA: ', respuestaActualizar);
                res.redirect('/aventura/reserva/lista');


            }
        } catch
            (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500});
        }




    }


}
