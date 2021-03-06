// Uncomment these imports to begin using these cool features!

import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from "@loopback/core";
import {repository} from "@loopback/repository";
import {get, getJsonSchemaRef, post, requestBody} from "@loopback/rest";
// import  * as UCS from "./specs/user.controller.spec";
import {UserProfile} from '@loopback/security';
import * as _ from 'lodash';
import {PermissionKeys} from '../authorization/permission-keys';
import {PasswordHashserBindings, TokenServiceBindings, UserServiceBindings} from '../keys';
import {User} from "../models";
import {Credentials, UserRepository} from "../repositories";
import {BcryptHasher} from "../services/hash.password.bcrypt";
import {JWTService} from "../services/jwt-service";
import {MyUserService} from "../services/user-service";
import {validateCredentials} from "../services/validator";
import {CredentialsRequestBody} from "./specs/user.controller.spec";

export class UserController {
  constructor(
    @repository(UserRepository)
    public UserRepository: UserRepository,
    // @inject('service.hasher')
    @inject(PasswordHashserBindings.PASSWORD_HASHSER)
    public hasher: BcryptHasher,
    //@inject('services.user.service')
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    // @inject('services.jwt.service')
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
  ) { }


  //-------------- FIX BUG SWEGGER - SEBELUMNYA  ------------------


  // defaultnya :  // @post('/signup', {
  //   responses: {
  //     '200' : {
  //       description : 'User',
  //       content : {
  //         schema:getJsonSchemaRef(User),
  //       }
  //     }
  //   }

  // })



  //-------------- FIX BUG SWEGGER - SEBELUMNYA ------------------


  //-------------- FIX BUG SWEGGER

  //  Resolver error at paths./signup.post.responses.200.content.schema.$ref
  //  Could not resolve reference: Could not resolve pointer: /definitions/User does not exist in document

  // schema: getJsonSchemaRef(User).$ref,    <<<!----  kalo pake ini doang masalah


  //----------------- REFIXED SOLVED EKI
  @post('/users/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          schema: getJsonSchemaRef(User),
          $ref: getJsonSchemaRef(User).$ref
        }
      }
    }

  })
  //----------------- /REFIXED SOLVED EKI

  //------------------- FIX BUG  Could not render n, see the console.
  // @post('/users/signup', {
  //   responses: {
  //     '200': {
  //       description: 'User',
  //       content: {
  //         'aplication/json': {
  //           schema: getJsonSchemaRef(User).$ref,
  //         }
  //       }
  //     }
  //   }

  // })
  //------------------- FIX BUG  Could not render n, see the console.

  //-------------- FIX BUG SWEGGER

  async signup(@requestBody() userData: User) {
    validateCredentials(_.pick(userData, ['email', 'password']))
    // encrypt the user password
    // eslint-disable-next-line require-atomic-updates
    userData.password = await this.hasher.hashPassword(userData.password);


    //---- authorization premission-keys
    userData.permissions = [PermissionKeys.AcessAuthFeature];
    //---- authorization premission-keys


    // savedUser : any   << eki edit
    const savedUser: any = await this.UserRepository.create(userData);
    delete savedUser.password;
    return savedUser;
    // next 6:19
    // POST /signup failed with status code 500. ResolutionError: The key 'service.hasher' is not bound to any value in context RequestContext-nBJp1bfTQDWucGjGfgib1Q-14

  }



  //----------------- Creating Login Route
  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'aplication/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',

                }
              }
            }
          }
        }
      }
    }
  })
  // async login(@requestBody(CredentialsRequestBody) credentials : Credentials): Promise<{token: string}>{

  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {

    //--------------------------- tambahan user.controller.spec -> user-service -> user controller  -> application ts -> await user controller
    //  await this.userService.verifyCredentials(credentials);

    // setelah selesai coding user.controller.ts ubah menjadi
    const user = await this.userService.verifyCredentials(credentials);
    // console.log(user);
    //--------------------------- /tambahan user.controller.spec -> user-service -> user controller  -> application ts -> await user controller

    //------------- syarat JWT tambahan dari user-service.ts

    const userProfile = this.userService.convertToUserProfile(user);
    //console.log(userProfile)
    //------------- /syarat JWT tambahan dari user-service.ts

    // selanjutnya generate JSON WEB TOKEN
    const token = await this.jwtService.generateToken(userProfile);
    // return Promise.resolve({ token: '12312311adadasdasda' })
    return Promise.resolve({token})
  }
  //----------------- Creating Login Route




  //---------------- Creating JWT Authentication Strategy

  // async me() : Promise<UserProfile> {
  //   return Promise.resolve({id: '1', name: 'Eki'})
  // }
  // @get('/users/me')
  // @authenticate('jwt')
  // async me(): Promise<UserProfile> {
  //   //return Promise.resolve({id: '1', name: 'Eki'})  <!--- ERROR
  //   // return Promise.resolve({[securityId]: '1', name: 'Eki'}) <!---  OK

  //   return Promise.resolve({id: '1', name: 'Eki', [securityId]: '1'})  //<!---BUG FIX
  // }



  @get('/users/me')
  @authenticate('jwt')
  async me(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: UserProfile,
  ): Promise<UserProfile> {
    // console.log(currentUser)
    return Promise.resolve(currentUser)
  }

  //---------------- /Creating JWT Authentication Strategy





}
