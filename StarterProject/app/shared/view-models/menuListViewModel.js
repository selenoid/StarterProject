/* global fetch, require, module */
var config = require("../../shared/config");
var fetchModule = require("fetch");
var cacheManager = require("~/utils/CacheManager.js");
var ObservableArray = require("data/observable-array").ObservableArray;

function MenuListViewModel(items) {
    var delegate;
    var viewModel = new ObservableArray(items);
    
    viewModel.load = function ( requestId ) {
        console.log("retrieveing menu items from URL..." + requestId); 
        
        var url = "http://contentapi.activebuilder.com/menu/items/"+requestId.toString()+"/1"; 
        
        return fetch(url, function () {
            console.log("labalep...");
        })
                .then(handleErrors)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {

            cacheManager.addItemWithKey(url, data);
            data.forEach(function (menuItem) {
                viewModel.push({
                    menuText: menuItem.MenuText,
                    requestId: menuItem.ItemId,
                    contentTypeId: menuItem.ContentTypeId
                });
            });
        });
    };

    viewModel.setDelegate = function (delegate) {
        console.log("set delegate : " + delegate);
    };

    viewModel.selectedMenuItemData = function (index) {
        var retval = {
            menuText:viewModel.getItem(index).menuText,
            requestId: viewModel.getItem(index).requestId,
            contentTypeId: viewModel.getItem(index).contentTypeId,
            toString: function () {
                return "requestId:"+this.requestId + 
                        ", contentTypeId:" + this.contentTypeId + 
                        ", menuText:"+this.menuText;
            }
        };

        return retval;
    };

    viewModel.empty = function () {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    viewModel.add = function (grocery) {
        return fetch(config.apiUrl + "Groceries", {
            method: "POST",
            body: JSON.stringify({
                Name: grocery
            }),
            headers: {
                "Authorization": "Bearer " + config.token,
                "Content-Type": "application/json"
            }
        })
                .then(handleErrors)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    viewModel.push({
                        name: grocery,
                        id: data.Result.Id
                    });
                });
    };

    viewModel.delete = function (index) {
        return fetch(config.apiUrl + "Groceries/" + viewModel.getItem(index).id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + config.token,
                "Content-Type": "application/json"
            }
        })
                .then(handleErrors)
                .then(function () {
                    viewModel.splice(index, 1);
                });
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

module.exports = MenuListViewModel;