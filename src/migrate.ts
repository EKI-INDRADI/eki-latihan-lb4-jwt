import {Rnd1Application} from './application';

export async function migrate(args: string[]) {

  //-------------- Original no edit -----------------
  // const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  // console.log('Migrating schemas (%s existing schema)', existingSchema);

  // const app = new Rnd1Application();
  // await app.boot();
  // await app.migrateSchema({existingSchema});
 //-------------- /Original no edit -----------------

  // const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  // console.log('Migrating schemas (%s existing schema)', existingSchema);

  // const app = new Rnd1Application();
  // await app.boot();
  // await app.migrateSchema({existingSchema});


  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new Rnd1Application();
  await app.boot();
  await app.migrateSchema({existingSchema
    //models : ['User'],
    // bukan panggil tbl-data atau tbl_datanya
    // melainkan panggil classnyayg ada di model.ts nya 
    //TblData
 // ternyata   await app.migrateSchema({existingSchema, models : ['User','TblData']   adalah
// ketika tabel tidak ada maka dia akan membuat TblData pada mysql


//, models : ['User','tbl_data'] , settingnya di model.ts aja

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
