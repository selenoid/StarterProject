/* global fetch, require, module */
var config = require("../../shared/config");
var fetchModule = require("fetch");
var cacheManager = require("~/utils/CacheManager.js");
var ObservableArray = require("data/observable-array").ObservableArray;

function MenuListViewModel(items) {
    var delegate;
    var url = "http://contentapi.activebuilder.com/menu/items/8064/1";

    var viewModel = new ObservableArray(items);


    viewModel.load = function () {
        var topalak = function () {
            console.log("tiri viri...");
        };

        //var cachedResponse = cacheManager.getItemWithKey(url);

        /*
         if (cachedResponse) {
         console.log("cachedResponse 2:" + cachedResponse);
         cacheManager.test();
         
         cachedResponse.forEach(function (menuItem) {
         console.log("evaluating with data from cache...");
         viewModel.push({
         menuText: menuItem.MenuText,
         id: menuItem.ItemId
         });
         });
         
         console.log("end of the loop...");
         return cachedResponse;
         }*/


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
                    id: menuItem.ItemId
                });
            });
        });
    };

    viewModel.setDelegate = function (delegate) {
        console.log("set delegate : " + delegate);
    };

    viewModel.getSelectedItem = function (index) {
        return viewModel.getItem(index).id;
        //delegate.onSelectHandler ( {itemId:viewModel.getItem(index).id, contentType:5});
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