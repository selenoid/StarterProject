/* global fetch, require */

var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;

function GroceryListViewModel(items) {
	var viewModel = new ObservableArray(items);
        
	viewModel.load = function () {
		return fetch("http://contentapi.activebuilder.com/menu/items/8064/1", {
		})
		.then(handleErrors)
		.then(function (response) {

			console.log("response : " + response);
			return response.json();

		}).then(function (data) {
			console.log("labalaiyen..." + data);
			data.forEach(function (menuItem) {
				console.log("pushing model : " + viewModel.length);
				viewModel.push({
					name : menuItem.MenuText,
					id : menuItem.ItemId
				});
			});
		});
	}; 

	viewModel.empty = function () {
		while (viewModel.length) {
			viewModel.pop();
		}
	};

	viewModel.add = function (grocery) {
		return fetch(config.apiUrl + "Groceries", {
			method : "POST",
			body : JSON.stringify({
				Name : grocery
			}),
			headers : {
				"Authorization" : "Bearer " + config.token,
				"Content-Type" : "application/json"
			}
		})
		.then(handleErrors)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			viewModel.push({
				name : grocery,
				id : data.Result.Id
			});
		});
	};
	
	viewModel.delete = function(index) {
    return fetch(config.apiUrl + "Groceries/" + viewModel.getItem(index).id, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + config.token,
            "Content-Type": "application/json"
        }
    })
    .then(handleErrors)
    .then(function() {
        viewModel.splice(index, 1);
    });
};


	return viewModel;
}

function handleErrors(response) {
	if (!response.ok) {
		console.log(JSON.stringify(response));
		throw Error(response.statusText);
	}
	return response;
}

module.exports = GroceryListViewModel;