
var observable = require("data/observable");
var utilsModule = new observable.Observable();

utilsModule.log = function (params) {
    console.log(">>" + params);
}

//Exposes the observable object as a module, which can be required from another js file.
module.exports = utilsModule;