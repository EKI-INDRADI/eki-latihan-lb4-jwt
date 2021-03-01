// loopback4 lama :
// import {  UserProfile } from '@loopback/authentication';
// loopback 4 baru :
// import {UserProfile} from '@loopback/security';
// infonya : https://loopback.io/doc/en/lb4/Security.html
import {inject} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
//import {UserProfile} from '@loopback/security';
import {securityId, UserProfile} from '@loopback/security'; // FIX securityID //https://www.udemy.com/course/loopback-4-the-complete-developers-guide/learn/lecture/15865448#questions/8162782
import {promisify} from 'util'; // util == utility    , untuk convert callback to promise


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


    //=========== fix jwt src\application.ts
    // this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService)
    // fix JWTService 7:41

    async verifyToken(token: string): Promise<UserProfile> {
        //https://www.udemy.com/course/loopback-4-the-complete-developers-guide/learn/lecture/15865448#questions/8162782

        // return Promise.resolve({name: 'Haider', id: '1'});

        //https://www.udemy.com/course/loopback-4-the-complete-developers-guide/learn/lecture/15865448#questions/8162782

        //PROBLEM SOLVED LOOPBACK4 NEW VERSION :
        const userProfile: UserProfile = {[securityId]: '1', name: 'Eki'};
        return Promise.resolve(userProfile);


    }



    //=========== next



}
