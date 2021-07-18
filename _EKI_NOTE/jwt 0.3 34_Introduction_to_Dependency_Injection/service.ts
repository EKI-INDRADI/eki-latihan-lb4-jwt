export class Service {
    name : string;
    constructor(name: string){
        this.name = name;
    }

    getServiceName() : string {
        return this.name;
    }
}