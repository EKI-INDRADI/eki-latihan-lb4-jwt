// Uncomment these imports to begin using these cool features!

import { repository } from "@loopback/repository";
import { getJsonSchemaRef, post, requestBody } from "@loopback/rest";
import { User } from "../models";
import { UserRepository } from "../repositories";

// import {inject} from '@loopback/core';


export class UserController {
  constructor(
    @repository(UserRepository)
   public UserRepository: UserRepository
  ) {}


@post('/signup', {
  responses: {
    '200' : {
      description : 'User',
      content : {
        schema:getJsonSchemaRef(User),
      }
    }
  }

})


  async signup(@requestBody() userData: User ){
    // savedUser : any   << eki edit
    const savedUser : any =  await this.UserRepository.create(userData);
    delete savedUser.password;
    return savedUser;


  }
}
