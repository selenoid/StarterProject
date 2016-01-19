
var http = require("http");

var api_key = '5e3d8ea6a7f68e02102d9f7213c5a7d2';
var observable = require("data/observable");
var observableModule = require("data/observable");
var observableArray = require("data/observable-array");

var myImages = new observableArray.ObservableArray([]);

//Creates an instance of an observable object.
var subPageViewModel = new observable.Observable();

subPageViewModel.initialValue = "Initial Value";
subPageViewModel.txtKeyword = "Rock"

subPageViewModel.getImages = function () {

    if(subPageViewModel.txtKeyword.legth < 2)
    {
        console.log("returning...");
        return;
    }
    
    while (myImages.length > 0) {
        myImages.pop();
    }
	
    var searchString = subPageViewModel.txtKeyword;
    http.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + api_key + "&text=" + searchString + "&format=json&nojsoncallback=1&per_page=5").then(function (r) {
        // Argument (r) is JSON!
        var imgUrl = '';
	    
        var photoList = r.photos.photo;
	    
        for (var i = 0;i < photoList.length;i++) {
            imgUrl = "https://farm" + photoList[i].farm + ".staticflickr.com/" + photoList[i].server + "/" + photoList[i].id + "_" + photoList[i].secret + ".jpg";
            console.log(imgUrl);
            myImages.push({ img: imgUrl });
        }
    }, function (e) {
        // Argument (e) is Error!
        console.log('error');
        console.log(e);
    });
    
    console.log("images:" + myImages.length);
    console.log("my Text:" + subPageViewModel.txtKeyword);
}

subPageViewModel.initApp = function() {
    this.set('listImages', myImages);
    
    subPageViewModel.set('txtKeyword', "Car");
}

subPageViewModel.actionGo = function() {
    this.set("initialValue", "The New Value " + getRandom(10));
};

function getRandom (max) {
    return (Math.floor(Math.random() * max) + "" + Math.floor(Math.random() * max) + "" + Math.floor(Math.random() * max) + "" + Math.floor(Math.random() * max));
}

//Exposes the observable object as a module, which can be required from another js file.
module.exports = subPageViewModel;