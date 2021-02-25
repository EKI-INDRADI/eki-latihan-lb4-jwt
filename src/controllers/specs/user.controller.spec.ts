// export const CredentialsSchema = {
//     type : 'object',
//     required : ['email', 'password'],
//     properties: {
//         email: {
//             type: 'string',
//             format: 'email'
//         },
//         password: {
//             type: 'string',
//             minLength: 8
//         }
//     }
// }

// export const CredentialsRequestBody = {
//     description: 'The input of login funtion',
//     required : true,
//     content: {
//         'application/json': {schema: CredentialsSchema},
//     }
// }


export const CredentialsSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        minLength: 8,
      },
    },
  };
  

  //export const CredentialsRequestBody  = {
  // EKI EDIT  : any agar ga rewel di panggil
  export const CredentialsRequestBody : any = {
    description: 'The input of login function',
    required: true,
    content: {
      'application/json': {schema: CredentialsSchema},
    },
  };