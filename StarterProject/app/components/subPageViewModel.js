//loads observable model
var observable = require("data/observable");

//Creates an instance of an observable object.
var subPageViewModel = new observable.Observable();

subPageViewModel.initialValue = "Initial Value";

subPageViewModel.initApp = function() {
    
    console.log("****initing viewModel from subPageViewModel...");
    console.log("sub page view inited " + this.initialValue);
}

subPageViewModel.actionGo = function() {
    this.set("initialValue","The New Value " + getRandom(10));
    console.log("calling action go..." + this);
};


function getRandom (max) {
    return (Math.floor(Math.random() * max)+""+Math.floor(Math.random() * max)+""+Math.floor(Math.random() * max)+""+Math.floor(Math.random() * max));
}

//Exposes the observable object as a module, which can be required from another js file.
module.exports = subPageViewModel;

console.log("*****this is subpageviewmodel...");