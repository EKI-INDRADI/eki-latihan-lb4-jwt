import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DtsRnd1DataSource} from '../datasources';
import {Job, JobRelations} from '../models';

export class JobRepository extends DefaultCrudRepository<
  Job,
  typeof Job.prototype.id,
  JobRelations
> {
  constructor(
    @inject('datasources.dts_rnd1') dataSource: DtsRnd1DataSource,
  ) {
    super(Job, dataSource);
  }
}
