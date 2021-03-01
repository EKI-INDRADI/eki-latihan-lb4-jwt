import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
//import { UserProfile } from '@loopback/security';
import {securityId, UserProfile} from '@loopback/security'; // FIX SecurityID https://www.udemy.com/course/loopback-4-the-complete-developers-guide/learn/lecture/15865448#questions/8162782
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories/user.repository';
import {BcryptHasher} from './hash.password.bcrypt';


export class MyUserService implements UserService<User, Credentials>{
    constructor(
        @repository(UserRepository)
        public userRepository: UserRepository,

        //---- setelah membuat func pada hash.password
        //ctrl+p @inject   pilih yg  '@loopback/core'
        // 'service.hasher' berasal dari application.ts
        @inject('service.hasher')
        public hasher: BcryptHasher
        //---- /setelah membuat func pada hash.password

    ) { }


    // verifyCredentials(credentials: Credentials): Promise<User> {
    async verifyCredentials(credentials: Credentials): Promise<User> {
        // throw new Error('Method not implemented.');

        // Promise akan error abaikan dlu
        const foundUser = await this.userRepository.findOne({
            // await akan eror abaikan dlu

            // agar tidak error perlu tambahkan func di hash.password.bcrypt.ts
            where: {
                email: credentials.email
            }
        });

        if (!foundUser) {
            throw new HttpErrors.NotFound(`user not found with this ${credentials.email}`);
        }

        //---- setelah membuat func pada hash.password
        // copy ctrl+p application.ts

        //    const passwordMatched = await this.hasher.comparePassword(<password plaintext format>, <password hash format>)
        const passwordMatched = await this.hasher.comparePassword(credentials.password, foundUser.password)


        if (!passwordMatched) {
            throw new HttpErrors.Unauthorized('password is not valid');
        }


        return foundUser;



    }
    convertToUserProfile(
        user: User
    ): UserProfile {
        // gak perlu import loopback/authentication kare user profilenya juga ngikutin saat quick fix
        // kalo divideo
        // import { UserService, UserProfile } from '@loopback/authentication';
        // tetapi karena looopback 4 update maka
        // import { UserService } from '@loopback/authentication';
        // import { UserProfile } from '@loopback/security';

        //-------------- untuk psersyaratan JWT ada id,name,email,password
        //---- maka frist dan last di gabung
        //   throw new Error('Method not implemented.');
        let userName = ''
        if (user.firstName) {
            userName = user.firstName;
        }
        if (user.lastName) {
            userName = user.firstName
                ? `${user.firstName} ${user.lastName}`
                : user.lastName;
        }
        //  return {id: user.id, name: userName} karena type number jadi error :
        // Property '[securityId]' is missing in type '{ id: number | undefined; name: string; }' but required in type 'UserProfile'.ts(2741)
        // maka sesuaikan tipe data dari   src\models\user.model.ts


        // ==============================code sendiri ===================
        // ----info : return {id: `${user.id}`, name: userName} // <<<---- ERRROR

        // ----info : gantinya pakai ini
        // let var_userid_string = String(user.id) // di ganti,  FIX securityID https://www.udemy.com/course/loopback-4-the-complete-developers-guide/learn/lecture/15865448#questions/8162782
        // ----info : var_return : any = {string, string}
        // let var_return: any = { id: var_userid_string, name: userName } // di ganti, FIX securityID https://www.udemy.com/course/loopback-4-the-complete-developers-guide/learn/lecture/15865448#questions/8162782
        // ----info : console.log("var_return :")
        // ----info : console.log(var_return)
        //  return (var_return) // // di ganti, FIX securityID https://www.udemy.com/course/loopback-4-the-complete-developers-guide/learn/lecture/15865448#questions/8162782




        //FIX securityID https://www.udemy.com/course/loopback-4-the-complete-developers-guide/learn/lecture/15865448#questions/8162782

        // mirip contoh :
        const userProfile: UserProfile = {
            id: user.id,
            name: userName,
            [securityId]: `${user.id}`,
        };
        return userProfile;
        //FIX securityID https://www.udemy.com/course/loopback-4-the-complete-developers-guide/learn/lecture/15865448#questions/8162782

        // ----info : lanjut ke user.controller


    }


}
