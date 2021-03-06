/* global require, module */

var validator = require("email-validator");
var config = require("../../shared/config");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;

function Main(info) {
    info = info || {};

    // You can add properties to observables on creation
    var viewModel = new Observable({
        email: info.email || "",
        password: info.password || ""
    });

    viewModel.start = function () {
        
        return true;
        
        /*
        return fetchModule.fetch("http://contentapi.activebuilder.com/menu/items/8064/1", {
            method: "GET",
            body: "",
            headers: {
                "Content-Type": "text/html; charset=utf-8"
            }
        })
                .then(handleErrors)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log("rabarandi : " + data.length);
                    ///config.token = data.Result.access_token;
                });*/
    };


    viewModel.login = function () {
        return fetchModule.fetch(config.apiUrl + "oauth/token", {
            method: "POST",
            body: JSON.stringify({
                username: viewModel.get("email"),
                password: viewModel.get("password"),
                grant_type: "password"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
                .then(handleErrors)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    config.token = data.Result.access_token;
                });
    };


    viewModel.register = function () {
        return fetchModule.fetch(config.apiUrl + "Users", {
            method: "POST",
            body: JSON.stringify({
                Username: viewModel.get("email"),
                Email: viewModel.get("email"),
                Password: viewModel.get("password")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleErrors);
    };

    viewModel.isValidEmail = function () {
        var email = this.get("email");
        return validator.validate(email);
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

module.exports = Main;