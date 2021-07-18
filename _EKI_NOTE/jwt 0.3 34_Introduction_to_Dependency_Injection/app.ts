import { Person } from './person';
import { Service } from './service';


const service1 = new Service('PersonService');
const service2 = new Service('TokenService');
const service3 = new Service('AuthService');

// const p = new Person();
// console.log(p.getInfo());
// const p1 = new Person();
// console.log(p1.getInfo());
// const p2 = new Person();
// console.log(p2.getInfo());

const p = new Person(service1);
console.log(p.getInfo());
const p1 = new Person(service2);
console.log(p1.getInfo());
const p2 = new Person(service3);
console.log(p2.getInfo());