import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import axios from 'axios';
import {configuracion} from '../config/config';
import {Credenciales, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {AuthService} from '../services';
@authenticate("admin")
@authenticate("admin")
export class UsuarioController {
  constructor(

    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(AuthService)
    public servicioAuth: AuthService
  ) { }
  @authenticate.skip()
  //Servicio de login
  @post('/login', {
    responses: {
      '200': {
        description: 'Identificación de usuarios'
      }
    }
  })
  async login(
    @requestBody() credenciales: Credenciales
  ) {
    const p = await this.servicioAuth.identificarPersona(credenciales.usuario, credenciales.password);
    if (p) {
      const token = this.servicioAuth.GenerarTokenJWT(p);
      return {
        status: "success",
        data: {
          nombre: p.Nombre,
          apellidos: p.Apellidos,
          correo: p.Correo,
          id: p.Id
        },
        token: token
      }
    } else {
      throw new HttpErrors[401]("Datos invalidos")
    }
  }
  @authenticate.skip()
  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['Id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'Id'>,
  ): Promise<Usuario> {
    const clave = this.servicioAuth.GenerarClave();
    const claveCifrada = this.servicioAuth.CifrarClave(clave);
    usuario.Password = claveCifrada;
    let tipo = '';
    tipo = configuracion.tipoComunicacion; //Definimos el tipo de comunicacion
    let servicioWeb = '';
    let destino = '';
    if (tipo == "sms") {
      destino = usuario.Telefono;
      servicioWeb = 'send_sms';
    } else {
      destino = usuario.Correo;
      servicioWeb = 'send_email';
    }
    const asunto = 'Registro de usuario en plataforma';
    const contenido = `Hola, ${usuario.Nombre} ${usuario.Apellidos} su contraseña en el portal es: ${clave}`
    axios({
      method: 'post',
      url: configuracion.baseURL + servicioWeb,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        destino: destino,
        asunto: asunto,
        contenido: contenido
      }
    }).then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    });
    const p = await this.usuarioRepository.create(usuario);
    return p;
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}
