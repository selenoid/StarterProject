var logger = require("./util.js");
var cacheManager = require("./CacheManager.js");
var http = require("http");
var api_key = '5e3d8ea6a7f68e02102d9f7213c5a7d2';
var observable = require("data/observable");

//Creates an instance of an observable object.
var serviceModule = new observable.Observable();
var eventListener = 'null';

serviceModule.getMenuItems = function () {
    logger.log("this is " + this + "and myMenuItems : " + this.myMenuItems);
    return this.myMenuItems;
}

serviceModule.addListener = function (listener) { 
    eventListener = listener;
}

serviceModule.onDataRetrieved = function (r) {
    logger.log("tag", "ON DATA RETRIEVED : " + r);
    var event = {
        eventName: "onServiceComplete",
        object: { data:r,  error:0 }
    };
        
    eventListener.notify(event);
}

serviceModule.onDataFailed = function (e) {
    logger.error('!!!!!!!!!!onURLRequestError : ' + e.toString());
    
    var event = {
        eventName: "onServiceComplete",
        object: { data:[],  error:e }
    };
        
    eventListener.notify(event);
}

serviceModule.getService = function (_url) {
    logger.log("tag",["getting menu service.." + _url]);
           
    var cachedItem = cacheManager.getItemWithKey(_url);
    logger.log("cached item : " + cachedItem);
    
    try {
        if (cachedItem) {
            logger.log("retrieve JSON data from CACHE..." + cachedItem);
            serviceModule.onDataRetrieved(cachedItem);
            return;
        }
    }catch (e) {
        logger.error("getServiceError : " + e);
    }
    
    logger.log("retrieve JSON data from remote service.LOADING..." + _url);
    
    http.getJSON(_url).then(function (r) {
        // Argument (r) is JSON!
        logger.log('GET JSON COMPLETE : ' + r.length);
            
        cacheManager.addItemWithKey(_url, r);
        serviceModule.onDataRetrieved(r);
    }, function (e) {
        logger.log("getJSONError : " + e.toString());
        // Argument (e) is Error!
        serviceModule.onDataFailed(e);
    });
}


//Exposes the observable object as a module, which can be required from another js file.
module.exports = serviceModule;