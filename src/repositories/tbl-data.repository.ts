import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DtsRnd1DataSource} from '../datasources';
import {TblData, TblDataRelations} from '../models';

export class TblDataRepository extends DefaultCrudRepository<
  TblData,
  typeof TblData.prototype.id,
  TblDataRelations
> {
  constructor(
    @inject('datasources.dts_rnd1') dataSource: DtsRnd1DataSource,
  ) {
    super(TblData, dataSource);
  }
}
