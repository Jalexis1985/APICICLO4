import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Aeropuertos} from '../models';
import {AeropuertosRepository} from '../repositories';

export class AeropuertoController {
  constructor(
    @repository(AeropuertosRepository)
    public aeropuertosRepository : AeropuertosRepository,
  ) {}

  @post('/aeropuertos')
  @response(200, {
    description: 'Aeropuertos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Aeropuertos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aeropuertos, {
            title: 'NewAeropuertos',
            exclude: ['Id'],
          }),
        },
      },
    })
    aeropuertos: Omit<Aeropuertos, 'Id'>,
  ): Promise<Aeropuertos> {
    return this.aeropuertosRepository.create(aeropuertos);
  }

  @get('/aeropuertos/count')
  @response(200, {
    description: 'Aeropuertos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Aeropuertos) where?: Where<Aeropuertos>,
  ): Promise<Count> {
    return this.aeropuertosRepository.count(where);
  }

  @get('/aeropuertos')
  @response(200, {
    description: 'Array of Aeropuertos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Aeropuertos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Aeropuertos) filter?: Filter<Aeropuertos>,
  ): Promise<Aeropuertos[]> {
    return this.aeropuertosRepository.find(filter);
  }

  @patch('/aeropuertos')
  @response(200, {
    description: 'Aeropuertos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aeropuertos, {partial: true}),
        },
      },
    })
    aeropuertos: Aeropuertos,
    @param.where(Aeropuertos) where?: Where<Aeropuertos>,
  ): Promise<Count> {
    return this.aeropuertosRepository.updateAll(aeropuertos, where);
  }

  @get('/aeropuertos/{id}')
  @response(200, {
    description: 'Aeropuertos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Aeropuertos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Aeropuertos, {exclude: 'where'}) filter?: FilterExcludingWhere<Aeropuertos>
  ): Promise<Aeropuertos> {
    return this.aeropuertosRepository.findById(id, filter);
  }

  @patch('/aeropuertos/{id}')
  @response(204, {
    description: 'Aeropuertos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aeropuertos, {partial: true}),
        },
      },
    })
    aeropuertos: Aeropuertos,
  ): Promise<void> {
    await this.aeropuertosRepository.updateById(id, aeropuertos);
  }

  @put('/aeropuertos/{id}')
  @response(204, {
    description: 'Aeropuertos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() aeropuertos: Aeropuertos,
  ): Promise<void> {
    await this.aeropuertosRepository.replaceById(id, aeropuertos);
  }

  @del('/aeropuertos/{id}')
  @response(204, {
    description: 'Aeropuertos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.aeropuertosRepository.deleteById(id);
  }
}
