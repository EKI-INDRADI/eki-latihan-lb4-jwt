import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'dts_rnd1',
  connector: 'mysql',
  url: 'mysql://root:masuk123@192.168.100.4/rnd1',
  host: '192.168.100.4',
  port: 3306,
  user: 'root',
  password: 'masuk123',
  database: 'rnd1'
};


// jika value di isi semua  url ga perlu di isi
// jika url di isi value seua ga perlu di isi

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DtsRnd1DataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'dts_rnd1';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.dts_rnd1', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
