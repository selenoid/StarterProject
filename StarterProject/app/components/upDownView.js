//retrieves the observable object defined in the upDownViewModel.js file.

var view = require("ui/core/view");
var model = require("./upDownViewModel");

exports.loadUpDownView = function(args) {
    
    //Sets the observable object as the page’s context.
    var page = args.object;
    page.bindingContext = model;
}