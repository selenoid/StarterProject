var http = require("http");
var observable = require("data/observable");
var logger = require("./util.js");

//Creates an instance of an observable object.
var dictionary = {};
var cacheManager = new observable.Observable();

logger.log("CacheManager inited..." + cacheManager);

function CustomError(errorCode, message, errorName) {
    this.name = errorName || 'CacheManagerError';
    this.errorCode = errorCode || -1;
    this.message = message || 'Default Message';
    this.stack = (new Error()).stack;

    this.toString = function () {
        var errMsg = this.name + ": ";
        errMsg += "Error Code : " + this.errorCode;
        errMsg += ", Error Message: " + this.message;
        return errMsg;
    };
}
;

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

cacheManager.addItemWithKey = function (key, data) {
    logger.log('adding item >> checking cacheManager...' + key);
    
    var checkItem = (dictionary["" + key]);
    
    if (checkItem) {
        try {
            throw new Error("an item with key '" + key + "' is already cached. Use 'overrideItemWithKey' method with the same key.")
            //    throw new CustomError(1001, "an item with key '" + key + "' is already cached. Use 'overrideItemWithKey' method with the same key.");
        } catch (e) {
            logger.error("addItemWithKeyError :: " + e.toString());
        }

        return false;
    } else {
        /*logger.log("---------------------------");
        logger.log('adding item ');
        logger.log('                with key: ' + key + ', data: ' + data);
        logger.log('                data: ' + data);
        logger.log("    ");
        logger.log("    ");*/
        dictionary[key] = data;
        cacheManager.listItems();
    }
}

cacheManager.getItemWithKey = function (key) {
    
    logger.log("getting item with key..."  + key);
    
    var retval = dictionary[key];
    if (retval) {
        logger.log("returning item with key..." + retval);
        return retval;
    } else {
        logger.warn("an dictionary item with key '" + key + "' not found.");
    }
    return false;
}

cacheManager.listItems = function () {
    /*logger.log("---------------------------");
    logger.log("---------------------------");
    logger.log("listing items...");*/
    if (Object.keys(dictionary).length > 0) {
        for (var key in dictionary) {
            // skip loop if the property is from prototype
            if (!dictionary.hasOwnProperty(key))
                continue;
            var item = dictionary[key];
            logger.log(key + " = " + item);
        }
    } else {
        logger.log('_no entry found...');
    }
}

module.exports = cacheManager;