"use strict";
exports.__esModule = true;
exports.Person = void 0;
var Person = /** @class */ (function () {
    // constructor(){
    function Person(service) {
        //  this.service = new Service('PersonService');
        this.service = service;
    }
    Person.prototype.getInfo = function () {
        return this.service.getServiceName();
    };
    return Person;
}());
exports.Person = Person;
