import { /* inject, */ BindingScope, injectable} from '@loopback/core';
// Nuevas librerias
const generator = require("password-generator");
const cryptoJS = require("crypto-js");
import {configuracion} from '../config/config';
import {Usuario} from '../models';
const jwt = require('jsonwebtoken');
import {UsuarioRepository} from '../repositories';
import {repository} from '@loopback/repository';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {
  constructor(@repository(UsuarioRepository)
  public usuarioRepository: UsuarioRepository) {}

  //Generacion de claves
  GenerarClave() {
    const clave = generator(8, false);
    return clave;
  }

  CifrarClave(clave: String) {
    const claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

}
//JWT
GenerarTokenJWT(Usuario: Usuario) {
  let token = jwt.sign({
    data: {
      id: Usuario.id,
      correo: Usuario.correo,
      nombre: Usuario.nombre + " " + Usuario.apellidos
    }
  }, configuracion.claveJWT)

  return token
}
validarTokenJWT(token: string) {
  try {
    let datos = jwt.verify(token, configuracion.claveJWT);
    return datos;
  } catch (error) {
    return false;
  }
}
//Autenticacion
IdentificarPersona(correo: string, password: string) {
  try {
    let p = this.usuarioRepository.findOne({where:
                  {
                  correo: correo,
                  password: password
                }})
    if (p) {
      return p;
    }
    return false;
  } catch {
    return false;
  }
}
