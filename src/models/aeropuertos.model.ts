import {Entity, model, property} from '@loopback/repository';

@model()
export class Aeropuertos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  Pais: string;

  @property({
    type: 'number',
    required: true,
  })
  Coord_X: number;

  @property({
    type: 'number',
    required: true,
  })
  Coord_Y: number;

  @property({
    type: 'string',
    required: true,
  })
  Siglas: string;

  @property({
    type: 'string',
    required: true,
  })
  Tipo: string;


  constructor(data?: Partial<Aeropuertos>) {
    super(data);
  }
}

export interface AeropuertosRelations {
  // describe navigational properties here
}

export type AeropuertosWithRelations = Aeropuertos & AeropuertosRelations;
