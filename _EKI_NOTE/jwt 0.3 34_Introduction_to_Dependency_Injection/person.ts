import { Service } from './service';

export class Person {
    service: Service;
      // constructor(){
    constructor(service: Service){
      //  this.service = new Service('PersonService');
        this.service = service
    }

    getInfo(){
        return this.service.getServiceName();
    }
}