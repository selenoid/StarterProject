var view = require("ui/core/view");
var viewModel = require("./menuViewModel");

exports.pageLoaded = function(args) {
    
    console.log("initing load menuView from menuViewJS");
    
    var page = args.object;
    page.bindingContext = viewModel;
    
    viewModel.initApp();
}