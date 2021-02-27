//--Refactoring Binding Keys to separate file

import {TokenService} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';

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



//--Refactoring Binding Keys to separate file
