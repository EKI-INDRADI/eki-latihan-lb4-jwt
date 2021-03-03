
import {MiddlewareSequence} from '@loopback/rest';

// ---- EDIT NOT USED----------------
// import {AuthenticateFn, AuthenticationBindings} from '@loopback/authentication';
// import {inject} from '@loopback/core';
// ---- EDIT NOT USED----------------


// Pahami dulu :
//https://loopback.io/doc/en/lb4/REST-middleware-sequence.html

//VS

//https://loopback.io/doc/en/lb4/REST-action-sequence.html


// ikutin panduan :
// https://loopback.io/doc/en/lb4/Authentication-tutorial.html


//Note: Skip this step when using a middleware-based sequence,
//which is used by default on newly-generated LoopBack 4 applications.


// kata member lain :
//Hello, the section 7 video 40-41, the implementation secuence dont'
// require in the loopback 4 becouse in the version 2.13.1 and >
// Only use middleware secuence and decorator @authentication('jwt') it's enough.

export class MySequence extends MiddlewareSequence { }


// kaga perlu di update ye jadinya

