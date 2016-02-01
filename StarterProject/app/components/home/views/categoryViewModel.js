
var http = require("http");

var logger = require("../../util/util.js");
var dataModel = require("../../data/data.js");
var serviceModel = require("../../util/serviceUtil.js");
var observable = require("data/observable");
var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var imageCacheModule = require("ui/image-cache");
var imageSource = require("image-source");
var fs = require("file-system");

var id = "categoryViewModel";
var listItems = new observableArray.ObservableArray([]);

//Creates an instance of an observable object.
var vm = new observable.Observable();
var delegate;

var cache = new imageCacheModule.Cache();

cache.placeholder = imageSource.fromFile(fs.path.join(__dirname, "res/no-image.png"));
//var defaultImage = imageSource.fromFile(fs.path.join(__dirname, "res/no-image.png"));
cache.maxRequests = 5;
// Enable download while not scrolling
cache.enableDownload();

var imgSource;
var url = "https://github.com/NativeScript.png";

vm.setDelegate = function (_delegate) {
    delegate = _delegate;
    logger.log("delegate is " + delegate);
}

vm.listViewItemTap = function (args) {
    try {
        selectItem({ view:args.view, index:args.index});
    } catch (error) {
        console.error(error.toString());
    }
}

vm.setListData = function (viewData) {
    logger.info("*********setting data model in categoryViewModel...");
    
    var viewList = viewData;
    var image;
    
    while (listItems.length > 0) {
        listItems.pop();
    }
	    
    for (var i = 0;i < viewList.length;i++) {
        
        for (var n = 0; n < 1; n++) {
            var url = dataModel.mStrings[n];
            
            image = cache.get(url);
            logger.log("tag2","myimage:" + image);
            
            if (image) {
                // If present -- use it.
                imgSource = imageSource.fromNativeSource(image);
                
                logger.log("tag2","Found Image! >> "+url);
                logger.log("tag2", "adding items to listViewAdaptor...");
                
                listItems.push({ title: viewList[i].Title+" " + i, categoryId:viewList[i].CategoryId, imageUrl:imgSource });
            } else {
                // If not present -- request its download.
                logger.log("tag3","starting download..." + url);
                
                
                cache.on ("downloadedEvent", function(event) {
                    logger.log("tag3", "download complete:"+ event.target)}
                );
                
                cache.push({
                               key: url,
                               url: url,
                               completed: function (image, key) {
                                   if (url === key) {
                                       imgSource = imageSource.fromNativeSource(image);
;                                      logger.log("tag3","****img downloaded "+imgSource.width + ", " + key);
                                   }
                               }
                           });
            }
            
            // Disable download while scrolling
            //cache.disableDownload();
            
            logger.log("tag2", "imgUrl1 :" + imgSource);
            defaultImage = "res://no-image";
            
            logger.log("tag2", "adding items to listViewAdaptor2...");
            listItems.push({ title: viewList[i].Title + "_" + i , categoryId:viewList[i].CategoryId, imageUrl:"res://no-image" });
        }
    }
    
    logger.log("CATEGORY_ITEMS 2 : " + listItems.length);
}

vm.initApp = function(dataBundle) {
    logger.info("*******set dataBundle in categoryViewModel...");
    this.set('listItems', listItems);
    try {
        vm.setDelegate(dataBundle.viewDelegate);
        vm.setListData(dataBundle.viewData);
    }catch (e) {
        logger.info("Error initing category app..." + e.toString() + " (" + dataBundle.viewData + ")");
    }
}

vm.actionGo = function() {
    this.set("initialValue", "The New Value " + getRandom(10));
};

function selectItem (selectionDataItem) {
    try {
        var selectedItem = listItems.getItem(selectionDataItem.index);
        
        var title = selectedItem.title;
        var categoryId = selectedItem.categoryId;
        var imageUrl = selectedItem.imageUrl;
        
        if (delegate !== undefined) {
            var tempData = {title:title, categoryId:categoryId, imageUrl:imageUrl};
            logger.log("tempData:" + tempData.imageUrl);
            delegate.onListItemSelect(tempData);
        } else {
            logger.log("no view delegate defined..");
        }
    } catch (error) {
        logger.error("selectItem error : " + error.toString());
    }
}

//Exposes the observable object as a module, which can be required from another js file.
module.exports = vm;