import {Rnd1Application} from './application';

export async function migrate(args: string[]) {

  //-------------- Original no edit -----------------
  // const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  // console.log('Migrating schemas (%s existing schema)', existingSchema);

  // const app = new Rnd1Application();
  // await app.boot();
  // await app.migrateSchema({existingSchema});
 //-------------- /Original no edit -----------------




  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new Rnd1Application();
  await app.boot();
  await app.migrateSchema({existingSchema,
    models : ['User'],
    //  models : ['User','tbl_data'],
  });

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
