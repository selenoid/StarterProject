
var observable = require("data/observable");
var utilsModule = new observable.Observable();
var logFilterTag = 'tag3, *';

utilsModule.log = function (params) {
    
    function checkTag(tagId) {
        var retval = logFilterTag.indexOf(tagId);
        return (retval > -1);
    }

    var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    
    
    if (logFilterTag.length === 0)
        console.log(args[0].toString());
    
    if (args.length > 1 && checkTag(args[0].toString())) {
        console.log(args[0] + " >> " + args[1]);
        return;
    }
}

utilsModule.debug = function (params) {
    console.log("< DEBUG >" + params);
}

utilsModule.warn = function (params) {
    console.log("@ WARNING  >> " + params);
}

utilsModule.error = function (params) {
    console.log("!!! ERROR CAUGHT  >> " + params);
}

utilsModule.info = function (params) {
    console.log("<< info >>" + params);
}

//Exposes the observable object as a module, which can be required from another js file.
module.exports = utilsModule;