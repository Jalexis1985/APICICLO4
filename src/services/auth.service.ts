import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {configuracion} from '../config/config';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
// Nuevas librerias
const generator = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

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

  //JWT
  GenerarTokenJWT(usuario: Usuario) {
    const token = jwt.sign({
      data: {
        id: usuario.Id,
        correo: usuario.Correo,
        nombre: usuario.Nombre + " " + usuario.Apellidos
      }
    }, configuracion.claveJWT)

    return token
  }

  validarTokenJWT(token: string) {
    try {
      const datos = jwt.verify(token, configuracion.claveJWT);
      return datos;
    } catch (error) {
      return false;
    }
  }

  //Autenticacion
  IdentificarPersona(correo: string, password: string) {
    try {
      const p = this.usuarioRepository.findOne({where:
                    {
                    Correo: correo,
                    Password: password
                  }})
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }


}
