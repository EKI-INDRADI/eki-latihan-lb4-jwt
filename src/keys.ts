//--Refactoring Binding Keys to separate file

import {TokenService, UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';
import {User} from './models';
import {Credentials} from './repositories';
import {PasswordHasher} from './services/hash.password.bcrypt';


export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = 'eki123secretkey';
  export const TOKEN_EXPIRES_IN_VALUE = "7h";
}

export namespace TokenServiceBindings {
  //1. ex : Ctrl+space BindingKey  (auto import bindingKey)
  //2.  data dari \src\application.ts
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret'
  );

  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expresIn'
  );

  //3. ex : Ctrl+space TokenService  (auto import TokenService)
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.jwt.service'
  );


  // ini berpengaruh pada application.ts (pada panggil class)
  // dan user.controller.ts (pada constructor inject)

}

export namespace PasswordHashserBindings {
  //1. ex : Ctrl+space BindingKey  (auto import bindingKey)
  //2.  data dari \src\application.ts

  //4. pastikan PasswordHashser pada src\services\hash.password.bcrypt.ts
  // sudah di export

  export const PASSWORD_HASHSER = BindingKey.create<PasswordHasher>(
    'services.hasher',
  );
  export const ROUNDS = BindingKey.create<number>('services.hasher.rounds');
}


//3. ex : Ctrl+space (auto import)
export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<Credentials, User>>(
    'services.user.service',
  )
}





//--Refactoring Binding Keys to separate file
