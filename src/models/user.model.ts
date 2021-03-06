import {Entity, model, property} from '@loopback/repository';

@model()

// @model({
//   settings: {
//     mysql: {
//       table: 'User',
//     },
//   },
// })

export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  //---------------------- Create admin role
  @property.array(String)
  permissions: String[];
  // pastikan pada tabel sudah ada column permissions
  // jika tidak ada maka loopback akan create columnn permission secara otomatis
  //---------------------- /Create admin role
  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
