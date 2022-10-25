import {Entity, model, property} from '@loopback/repository';

@model()
export class Rutas extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Origen: string;

  @property({
    type: 'string',
    required: true,
  })
  Destino: string;

  @property({
    type: 'number',
    required: true,
  })
  Tiempo_estimado: number;


  constructor(data?: Partial<Rutas>) {
    super(data);
  }
}

export interface RutasRelations {
  // describe navigational properties here
}

export type RutasWithRelations = Rutas & RutasRelations;
