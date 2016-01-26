
var observable = require("data/observable");
var utilsModule = new observable.Observable();

utilsModule.log = function (params) {
    //console.log(">>" + params);
}
utilsModule.debug = function (params) {
    console.log("DEBUG >>" + params);
}

utilsModule.warn = function (params) {
    console.log("@ WARNING  >> " + params);
}

utilsModule.error = function (params) {
    console.log("!!! ERROR CAUGHT  >> " + params);
}

//Exposes the observable object as a module, which can be required from another js file.
module.exports = utilsModule;