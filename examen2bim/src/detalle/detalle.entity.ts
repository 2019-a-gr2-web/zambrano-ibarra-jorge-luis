import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PedidoEntity } from '../pedido/pedido.entity';
import { PeliculaEntity } from '../pelicula/pelicula.entity';

@Entity('detalle')
export class DetalleEntity{

  @PrimaryGeneratedColumn()
  idDetalle:number;

  @Column({
    type:'int',
    name:'cantidad'
  })
  cantidadDetalle:number;

  @ManyToOne(type => PedidoEntity,pedido => pedido.idDetalle)
  idPedido:PedidoEntity;

  @ManyToOne(type => PeliculaEntity, hijo => hijo.idDetalle)
  idHijo:PeliculaEntity;

}
