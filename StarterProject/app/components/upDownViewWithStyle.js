var view = require("ui/core/view");
var viewModel = require("./upDownViewModel");

exports.loadUpDownView = function(args) {
    var page = args.object;
    page.bindingContext = viewModel;
}