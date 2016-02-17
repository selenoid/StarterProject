/* global module, Error, e */

var http = require("http");
var observable = require("data/observable");
//Creates an instance of an observable object.
var dictionary = {};
var tatava = 0;
var cacheManager = new observable.Observable();

console.log("CacheManager inited..." + tatava++);


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
    console.log('adding item >> checking cacheManager...' + key);

    var checkItem = (dictionary["" + key]);

    if (checkItem) {
        try {
            throw new Error("an item with key '" + key + "' is already cached. Use 'overrideItemWithKey' method with the same key.")
            //    throw new CustomError(1001, "an item with key '" + key + "' is already cached. Use 'overrideItemWithKey' method with the same key.");
        } catch (e) {
            console.error("addItemWithKeyError :: " + e.toString());
        }

        return false;
    } else {
        dictionary[key] = data;
        cacheManager.listItems();
    }
};

cacheManager.getItemWithKey = function (key) {

    var retval = dictionary[key];
    if (retval) {
        console.log("returning item with key..." + retval);
        return retval;
    } else {
        console.warn("an dictionary item with key '" + key + "' not found.");
    }
    return false;
};


cacheManager.listItems = function () {
    if (Object.keys(dictionary).length > 0) {
        for (var key in dictionary) {
            // skip loop if the property is from prototype
            if (!dictionary.hasOwnProperty(key))
                continue;
            var item = dictionary[key];
            console.log(key + " = " + item);
        }
    } else {
        console.log('_no entry found...');
    }
};

cacheManager.test = function () {
    tatava++;
    console.log("tatavasyon : " + tatava);
};

module.exports = cacheManager;