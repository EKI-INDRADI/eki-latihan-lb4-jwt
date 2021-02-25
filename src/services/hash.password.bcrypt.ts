import { inject } from '@loopback/core';
import { compare, genSalt, hash } from 'bcryptjs';

interface PasswordHasher<T = string> {
    hashPassword(password: T): Promise<T>;
    //--- agar user-service.ts tidak error
    //comparePassword(<input password>: T, <<password database>>: T) : 
    comparePassword(providedPass: T, storedPass: T): Promise<boolean>
    //--- agar user-service.ts tidak error
}


export class BcryptHasher implements PasswordHasher<string> {
    // class BcryptHasher   quick fix ->  PasswordHasher , maka akan membuat class comparePassword
    // comparePassword(providedPass: string, storedPass: string): Promise<boolean> {

    // rubah menjadi async
    async comparePassword(providedPass: string, storedPass: string): Promise<boolean> {
        //throw new Error('Method not implemented.');

        const passwordMatched = await compare(providedPass, storedPass)
        // pada ctrl +space compare enter (import compare  bcryptjs)

        return passwordMatched
    }




    // --- tambahan dari application.ts
    @inject('rounds')
    public readonly rounds: number;


    // round: number = 10;  <<=== tidak diperlukan lg
    // --- tambahan dari application.ts
    async hashPassword(password: string) {
        const salt = await genSalt(this.rounds);
        return await hash(password, salt);
    }
}