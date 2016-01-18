//loads observable model
var observable = require("data/observable");

//Creates an instance of an observable object.
var testAppViewModel = new observable.Observable();

//Adds attributes to the observable object including those displayed in the UI:
testAppViewModel.maxInteger = 10;
testAppViewModel.nuInteger = "-1";
testAppViewModel.oldInteger = -1;

 testAppViewModel.initApp = function() {
    
    console.log("****initing viewModel from ViewModelJS...");
    
    this.set('nuInteger',getRandom(this.maxInteger));
    this.set('oldInteger',getRandom(this.maxInteger));
    
    console.log("application inited " + this.oldInteger + ", " + this.nuInteger);
}

// functions
testAppViewModel.getNewNumber = function() {
    
    console.log("Max integer : " + this.maxInteger);
    console.log("starting..." + this.oldInteger);
    
    this.oldInteger = this.nuInteger;
    
    this.randomNum = getRandom(this.maxInteger);
    this.set("nuInteger", this.randomNum);
    
    console.log("Nu Integer : " + this.nuInteger);
}

//Exposes the observable object as a module, which can be required from another js file.
module.exports = testAppViewModel;

function getRandom (max) {
    return Math.floor(Math.random() * max);
}