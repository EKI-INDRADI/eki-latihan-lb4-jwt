// Uncomment these imports to begin using these cool features!
// hasil copy dari src\controllers\user.controller.ts
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {getJsonSchemaRef, post, requestBody} from '@loopback/rest';
import * as _ from 'lodash';
import {PermissionKeys} from '../authorization/permission-keys';
import {PasswordHashserBindings} from '../keys';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {BcryptHasher} from '../services/hash.password.bcrypt';
import {validateCredentials} from '../services/validator';
// hasil copy dari src\controllers\user.controller.ts

export class AdminController {
  constructor(
    @repository(UserRepository)
    public UserRepository: UserRepository,
    // @inject('service.hasher')
    @inject(PasswordHashserBindings.PASSWORD_HASHSER)
    public hasher: BcryptHasher,
    //@inject('services.user.service')
  ) { }



  // hasil copy dari src\controllers\user.controller.ts
  //  @post('/users/signup', {
  // @post('/users/signup', {
  //   responses: {
  //     '200': {
  //       description: 'User',
  //       content: {
  //         schema: getJsonSchemaRef(User),
  //         $ref: getJsonSchemaRef(User).$ref
  //       }
  //     }
  //   }

  // })

  @post('/admin', {
    responses: {
      '200': {
        description: 'Admin',
        content: {
          schema: getJsonSchemaRef(User),
          $ref: getJsonSchemaRef(User).$ref
        }
      }
    }

  })


  // async signup(@requestBody() userData: User) {
  async create(@requestBody() admin: User) {
    //validateCredentials(_.pick(userData, ['email', 'password']))
    validateCredentials(_.pick(admin, ['email', 'password']))


    //---- authorization premission-keys
    admin.permissions = [
      PermissionKeys.CreateJob,
      PermissionKeys.UpdateJob,
      PermissionKeys.DeleteJob
    ];

    //---- authorization premission-keys

    //    userData.password = await this.hasher.hashPassword(userData.password);
    admin.password = await this.hasher.hashPassword(admin.password);


    // const savedUser: any = await this.UserRepository.create(userData);
    // delete savedUser.password;
    // return savedUser;

    const savedAdmin: any = await this.UserRepository.create(admin);
    delete savedAdmin.password;
    return savedAdmin;
  }

  // hasil copy dari src\controllers\user.controller.ts

}
