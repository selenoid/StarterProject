var view = require("ui/core/view");
//var viewModel = require("./testViewModel");

function _OnTest () {
    console.log("on inner test view loaded method");
}

exports.onTestViewLoaded = function () {
    console.log("on outer test view loaded method");
    _OnTest();
}