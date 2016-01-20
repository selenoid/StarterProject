
var view = require("ui/core/view");
var viewModel = require("./startViewModel");


exports.pageLoaded = function(args) {
    
    console.log("initing load startView from startViewJS");
    
    var page = args.object;
    page.bindingContext = viewModel;
    
    viewModel.initApp();
}