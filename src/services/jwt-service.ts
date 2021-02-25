// loopback4 lama :
// import {  UserProfile } from '@loopback/authentication';
// loopback 4 baru :

import { HttpErrors } from '@loopback/rest';
import { UserProfile } from '@loopback/security';

import { promisify } from 'util'; // util == utility    , untuk convert callback to promise
import { inject } from '@loopback/core';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);

export class JWTService {


    //-------------------- JWT SECRETKEY & EXPIRESIN CONSTANT VALUE
    @inject('authentication.jwt.secret')
    public readonly jwtSecret: string;
    @inject('authentication.jwt.expiresin')
    public readonly jwtExpiresIn: string;
    //-------------------- /JWT SECRETKEY & EXPIRESIN CONSTANT VALUE

    async generateToken(userProfile: UserProfile): Promise<string> {
        if (!userProfile) {
            throw new HttpErrors.Unauthorized(
                'Error while generating token userpofile is null',
            );
        }

        let token = '';
        try {

            //signAsync(PAYLOAD, SECRET_KEY, {EXPIRESIN})
            //https://github.com/auth0/node-jsonwebtoken  <<=== liat expiresin dsni


            //   token = await signAsync(userProfile, 'eki123secretkey', {
            //    expiresIn: '7h',
            // })


            //-------------------- JWT SECRETKEY & EXPIRESIN CONSTANT VALUE
            token = await signAsync(userProfile, this.jwtSecret, {
                expiresIn: this.jwtExpiresIn,
            })
            //-------------------- /JWT SECRETKEY & EXPIRESIN CONSTANT VALUE

        } catch (err) {
            throw new HttpErrors.Unauthorized(`error generating token ${err}`);
        }


        return token;

    }
}