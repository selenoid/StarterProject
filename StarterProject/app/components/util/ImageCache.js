var observable = require("data/observable");
var imageCacheModule = new observable.Observable();
var trace = require("trace");

var imageCacheModule = require("ui/image-cache");
var imageSource = require("image-source");
var fs = require("file-system");

var cache = new imageCacheModule.Cache();


cache.placeholder = imageSource.fromFile(fs.path.join(__dirname, "res/no-image.png"));
cache.maxRequests = 5;

// Enable download while not scrolling
cache.enableDownload();

var imgSource;
var url = "https://github.com/NativeScript.png";


// Try to read the image from the cache
//var image = cache.get(url);

imageCacheModule.getImage = function (url) {
    
    log("tag", "getting images ... " + url);
    image = cache.get(url);
}

if (image) {
    // If present -- use it.
    imgSource = imageSource.fromNativeSource(image);
}
else {
    // If not present -- request its download.
    cache.push({
        key: url,
        url: url,
        completed: function (image, key) {
            if (url === key) {
                imgSource = imageSource.fromNativeSource(image);
            }
        }
    });
}

// Disable download while scrolling
cache.disableDownload();


//Exposes the observable object as a module, which can be required from another js file.
module.exports = imageCacheModule;