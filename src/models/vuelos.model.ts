import {Entity, model, property} from '@loopback/repository';

@model()
export class Vuelos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'date',
    required: true,
  })
  Fecha_inicio: string;

  @property({
    type: 'number',
    required: true,
  })
  Hora_inicio: number;

  @property({
    type: 'date',
    required: true,
  })
  Fecha_fin: string;

  @property({
    type: 'number',
    required: true,
  })
  Hora_fin: number;

  @property({
    type: 'number',
    required: true,
  })
  Asientos_vendidos: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre_piloto: string;

  @property({
    type: 'string',
    required: true,
  })
  Ruta: string;


  constructor(data?: Partial<Vuelos>) {
    super(data);
  }
}

export interface VuelosRelations {
  // describe navigational properties here
}

export type VuelosWithRelations = Vuelos & VuelosRelations;
