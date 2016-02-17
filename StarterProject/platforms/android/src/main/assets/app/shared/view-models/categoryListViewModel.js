/* global fetch, require, module */
var config = require("../../shared/config");
var fetchModule = require("fetch");
var cacheManager = require("~/utils/CacheManager.js");
var ObservableArray = require("data/observable-array").ObservableArray;

function CategoryListViewModel(items) {
    var delegate;
    var viewModel = new ObservableArray(items);

    viewModel.load = function ( requestId ) {
        console.log("retrieveing category items from URL..." + requestId); 
        
        var url = "http://contentapi.activebuilder.com:80/category/subcategories/"+requestId.toString(); 

        return fetch(url, function () {
            console.log("labalep...");
        })
                .then(handleErrors)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {

            cacheManager.addItemWithKey(url, data);
            data.forEach(function (categoryItem) {
                viewModel.push({
                    title: categoryItem.Title,
                    requestId: categoryItem.CategoryId,
                    imageUrl: categoryItem.ImageUrl
                });
            });
        });
    };

    viewModel.setDelegate = function (delegate) {
        console.log("set delegate : " + delegate);
    };

    viewModel.selectedMenuItemData = function (index) {
        var retval = {
            title:viewModel.getItem(index).title,
            requestId: viewModel.getItem(index).requestId,
            imageUrl: viewModel.getItem(index).imageUrl,
            toString: function () {
                return "requestId:"+this.requestId + 
                        ", contentTypeId:" + this.contentTypeId + 
                        ", menuText:"+this.title;
            }
        };
        
        return retval;
    };

    viewModel.empty = function () {
        while (viewModel.length) {
            viewModel.pop();
        }
    };
    
    return viewModel;
}

function getFromCache(url) {
    return "this is cached : " + url;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = CategoryListViewModel;