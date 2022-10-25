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
import {Vuelos} from '../models';
import {VuelosRepository} from '../repositories';

export class VuelosController {
  constructor(
    @repository(VuelosRepository)
    public vuelosRepository : VuelosRepository,
  ) {}

  @post('/vuelos')
  @response(200, {
    description: 'Vuelos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vuelos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vuelos, {
            title: 'NewVuelos',
            exclude: ['Id'],
          }),
        },
      },
    })
    vuelos: Omit<Vuelos, 'Id'>,
  ): Promise<Vuelos> {
    return this.vuelosRepository.create(vuelos);
  }

  @get('/vuelos/count')
  @response(200, {
    description: 'Vuelos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vuelos) where?: Where<Vuelos>,
  ): Promise<Count> {
    return this.vuelosRepository.count(where);
  }

  @get('/vuelos')
  @response(200, {
    description: 'Array of Vuelos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vuelos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vuelos) filter?: Filter<Vuelos>,
  ): Promise<Vuelos[]> {
    return this.vuelosRepository.find(filter);
  }

  @patch('/vuelos')
  @response(200, {
    description: 'Vuelos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vuelos, {partial: true}),
        },
      },
    })
    vuelos: Vuelos,
    @param.where(Vuelos) where?: Where<Vuelos>,
  ): Promise<Count> {
    return this.vuelosRepository.updateAll(vuelos, where);
  }

  @get('/vuelos/{id}')
  @response(200, {
    description: 'Vuelos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vuelos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Vuelos, {exclude: 'where'}) filter?: FilterExcludingWhere<Vuelos>
  ): Promise<Vuelos> {
    return this.vuelosRepository.findById(id, filter);
  }

  @patch('/vuelos/{id}')
  @response(204, {
    description: 'Vuelos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vuelos, {partial: true}),
        },
      },
    })
    vuelos: Vuelos,
  ): Promise<void> {
    await this.vuelosRepository.updateById(id, vuelos);
  }

  @put('/vuelos/{id}')
  @response(204, {
    description: 'Vuelos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() vuelos: Vuelos,
  ): Promise<void> {
    await this.vuelosRepository.replaceById(id, vuelos);
  }

  @del('/vuelos/{id}')
  @response(204, {
    description: 'Vuelos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.vuelosRepository.deleteById(id);
  }
}
