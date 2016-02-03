
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
var test = "denemesel";

var id = "categoryViewModel";
var listItems = new observableArray.ObservableArray([]);

//Creates an instance of an observable object.
var vm = new observable.Observable();
var delegate;
var listItemDict = {};
var listView;
var nuViewData;
var cache = new imageCacheModule.Cache();

cache.placeholder = imageSource.fromFile(fs.path.join(__dirname, "res/noimage.png"));
//var defaultImage = imageSource.fromFile(fs.path.join(__dirname, "res/no-image.png"));
cache.maxRequests = 10;
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

function refreshImages(e) {
    logger.log("refreshing images.." + e.key);
}

vm.setListData = function (viewData) {
    this.nuViewData = viewData;
    logger.info("*********setting data model in categoryViewModel..." + this.nuViewData);
    
    listItemDict = {};
    
    try {
        for (e in listItemDict) {
            logger.log("tag3", "item : " + e + " => " + listItemDict[e]);
        }
    }catch (error) {
        logger.log("list item dict ennumarator 1 : " + error.toString());
    }
    
    var viewList = viewData;
    
    var image;
    
    while (listItems.length > 0) {
        listItems.pop();
    }    
    
    cache.on("downloaded", updateImages);
	
    for (var i = 0;i < viewList.length;i++) {
        var url = dataModel.mStrings[i];
            
        image = cache.get(url);
            
        if (image) {
            // If present -- use it.
            imgSource = imageSource.fromNativeSource(image);
        } else {
            // If not present -- request its download.
            cache.push({
                           key: url,
                           url: url,
                           completed: function (image, key) {
                               if (url === key) {
                                   //logger.log("tag3", "****img downloaded " + imgSource.width + ", " + key);
                               }
                           }
                       });
        }
            
        // Disable download while scrolling
        //cache.disableDownload();
            
        var itemData = { title: viewList[i].Title + " " + i , categoryId:viewList[i].CategoryId, imageUrl:imgSource };
            
        listItemDict[url] = itemData;
        listItems.push(itemData);
        
    }
    
    setTimeout(digiloo, 2000);
}

vm.initApp = function(dataBundle, lv) {
    logger.info("*******set dataBundle in categoryViewModel...");
    this.set('listItems', listItems);
    
    try {
        vm.setDelegate(dataBundle.viewDelegate);
        vm.setListData(dataBundle.viewData);
        this.listView = lv;
        logger.log("tag3", "this.listView: " + this.listView);
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

function updateImages(event) {
    listView.refresh();
    /*var item = listItemDict[event.key];
    item.imageUrl = imageSource.fromNativeSource(event.image);
    refresh();
    listView.refresh();*/
}

function digiloo () {
    logger.log("tag3", "-----------------------------");
    logger.log("tag3", "LIST_ITEM_DICT!.." + listItemDict);
    logger.log("tag3", "LIST_VIEW!.." + vm.listView);
    
    var itemData = { title: "ZABOTTORI" + " " , categoryId:"007", imageUrl:"http://androidexample.com/media/webservice/LazyListView_images/image6.png", };
    
    listItems.push(itemData);
    vm.listView
}

//Exposes the observable object as a module, which can be required from another js file.
module.exports = vm;