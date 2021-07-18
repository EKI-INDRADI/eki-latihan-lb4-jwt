"use strict";
exports.__esModule = true;
exports.Service = void 0;
var Service = /** @class */ (function () {
    function Service(name) {
        this.name = name;
    }
    Service.prototype.getServiceName = function () {
        return this.name;
    };
    return Service;
}());
exports.Service = Service;
