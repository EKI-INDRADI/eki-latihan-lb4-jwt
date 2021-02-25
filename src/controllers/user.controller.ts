// Uncomment these imports to begin using these cool features!

import { repository } from "@loopback/repository";
import { getJsonSchemaRef, post, requestBody } from "@loopback/rest";
import { User } from "../models";
import { Credentials, UserRepository } from "../repositories";
import { validateCredentials } from "../services/validator";
import * as _ from 'lodash';
import { inject } from "@loopback/core";
import { BcryptHasher } from "../services/hash.password.bcrypt";
import { CredentialsRequestBody } from "./specs/user.controller.spec";
import { MyUserService } from "../services/user-service";
import { JWTService } from "../services/jwt-service";
// import  * as UCS from "./specs/user.controller.spec";


export class UserController {
  constructor(
    @repository(UserRepository)
    public UserRepository: UserRepository,
    @inject('service.hasher')
    public hasher: BcryptHasher,
    @inject('services.user.service')
    public userService: MyUserService,
    @inject('services.jwt.service')
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


  @post('/users/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          schema: getJsonSchemaRef(User).$ref,
        }
      }
    }

  })
  //-------------- FIX BUG SWEGGER 

  async signup(@requestBody() userData: User) {
    validateCredentials(_.pick(userData, ['email', 'password']))
    // encrypt the user password
    // eslint-disable-next-line require-atomic-updates
    userData.password = await this.hasher.hashPassword(userData.password);

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
  ): Promise<{ token: string }> {

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
    return Promise.resolve({ token })
  }
  //----------------- Creating Login Route
}