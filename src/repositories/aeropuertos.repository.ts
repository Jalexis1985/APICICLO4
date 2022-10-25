import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Aeropuertos, AeropuertosRelations} from '../models';

export class AeropuertosRepository extends DefaultCrudRepository<
  Aeropuertos,
  typeof Aeropuertos.prototype.Id,
  AeropuertosRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Aeropuertos, dataSource);
  }
}
