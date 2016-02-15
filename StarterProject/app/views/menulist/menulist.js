
/* global require, exports */
var app = require("application");
var dialogsModule = require("ui/dialogs");
var socialShare = require("nativescript-social-share");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var MenuListViewModel = require("../../shared/view-models/menuListViewModel");
var viewModule = require("ui/core/view");
var page;

var menuList = new MenuListViewModel([]);

var pageData = new Observable({
    menuList: menuList
});

exports.navigatedTo =  function (args) {
    var page = args.object;
    var navContext = page.navigationContext;
    
    console.log("navigation context : " + navContext);
    page.bindingContext = page.navigationContext;
};

exports.loaded = function (args) {

    console.log("menu list loaded...");
    page = args.object;
    var listView = page.getViewById("menuList");

    page.bindingContext = pageData;
    menuList.empty();
    pageData.set("isLoading", true);
    menuList.load().then({
    })
            .then(function () {
                console.log("zabariyun...");
                pageData.set("isLoading", false);
                listView.animate({
                    opacity: 1,
                    duration: 1000
                });
            });
};

exports.select = function(args) {
    console.log(".............");
    console.log("DAGARINYA!...");
    
    var item = args.view.bindingContext;
    var selectedId = menuList.getSelectedItem(menuList.indexOf(item));
    app.selectItem(selectedId);
    
    //menuList.getSelectedItem()
    //menuList.selectItem(menuList.indexOf(item));
};

exports.delete = function(args) {
    var item = args.view.bindingContext;
    var index = menuList.indexOf(item);
};

exports.share = function () {
    var list = [];
    var finalList = "";
    for (var i = 0, size = menuList.length; i < size; i++) {
        list.push(menuList.getItem(i).name);
    }
    var listString = list.join(", ").trim();
    socialShare.shareText(listString);
};