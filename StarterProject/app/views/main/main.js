/* global exports, Promise, UIBarStyle */
var app = require("application");
var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var viewModule = require("ui/core/view");
var dialogsModule = require("ui/dialogs");

var MainViewModel = require("../../shared/view-models/mainViewModel");
var main = new MainViewModel({
    email: "tj.vantoll@gmail.com",
    password: "password"
});

exports.loaded = function (args) {
    var page = args.object;
    page.bindingContext = main;

    if (page.ios) {
        var navigationBar = frameModule.topmost().ios.controller.navigationBar;
        navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    }
    
    app.onListItemSelected(
            {menuText: "Main Menu",
                requestId: 8064,
                contentTypeId: 4,
                toString: function () {
                    return "requestId:" + this.requestId +
                            ", contentTypeId:" + this.contentTypeId +
                            ", menuText:" + this.menuText;
                }
            }
    );
    /*
     var navigationEntry = {
     moduleName: "views/menulist/menulist",
     context: {delegate: app},
     animated: true
     };
     
     frameModule.topmost().navigate(navigationEntry);
     */
    //frameModule.topmost().navigate("views/menulist/menulist");

    /*main.start()
     .catch(function (error) {
     console.log(error);
     dialogsModule.alert({
     message: "Unfortunately we could not get data from server.",
     okButtonText: "OK"
     });
     return Promise.reject();
     })
     .then(function () {
     console.log("navigate to menu screen");
     frameModule.topmost().navigate("views/menulist/menulist");
     });*/
};

exports.signIn = function () {
    main.login()
            .catch(function (error) {
                console.log(error);
                dialogsModule.alert({
                    message: "Unfortunately we could not find your account.",
                    okButtonText: "OK"
                });
                return Promise.reject();
            })
            .then(function () {
                //frameModule.topmost().navigate("views/list/list");
            });
};

exports.register = function () {
    //var topmost = frameModule.topmost();
    //topmost.navigate("views/register/register");
};