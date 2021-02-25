import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import path from 'path';
import { MySequence } from './sequence';
import { BcryptHasher } from './services/hash.password.bcrypt';
import { MyUserService } from './services/user-service';
import { JWTService } from './services/jwt-service';

export { ApplicationConfig };

export class Rnd1Application extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);


    // FIX BUG POST /signup failed with status code 500. ResolutionError: The key 'service.hasher' is not bound to any value in context RequestContext-nBJp1bfTQDWucGjGfgib1Q-14
    //=========================================================
    // set up the custom sequence

    this.setupBinding();


    //=========================================================

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
  // FIX BUG POST /signup failed with status code 500. ResolutionError: The key 'service.hasher' is not bound to any value in context RequestContext-nBJp1bfTQDWucGjGfgib1Q-14
  //=========================================================
  // set up the custom sequence

  setupBinding(): void {
    this.bind('service.hasher').toClass(BcryptHasher);

    // ctrl+space BcryptHasher enter (biar ke import)

    //--------------------------- tambahan
    this.bind('rounds').to(10);
    //--------------------------- /tambahan

    //--------------------------- tambahan user.controller.spec -> user-service -> user controller  -> application ts
    this.bind('services.user.service').toClass(MyUserService)
    //--------------------------- /tambahan user.controller.spec -> user-service -> user controller  -> application ts

    //-------------------- JWT
    this.bind('services.jwt.service').toClass(JWTService)
    //-------------------- /JWT


    //-------------------- JWT SECRETKEY CONSTANT VALUE
    this.bind('authentication.jwt.secret').to('eki123secretkey')
    //-------------------- /JWT SECRETKEY CONSTANT VALUE

    //-------------------- JWT EXPIRESIN CONSTANT VALUE
    this.bind('authentication.jwt.expiresin').to('7h')
    //-------------------- /JWT EXPIRESIN CONSTANT VALUE

  }


  //=========================================================


}