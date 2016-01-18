//loads observable model
var observable = require("data/observable");

//Creates an instance of an observable object.
var upDownViewModel = new observable.Observable();

//Adds attributes to the observable object including those displayed in the UI:

upDownViewModel.noOfCards = 10;
upDownViewModel.cards = [];

upDownViewModel.currentCardIndex = 0;

upDownViewModel.currentCard = 0;
upDownViewModel.nextCard = 0;

//Set the score to 0 and notifies the UI that the score value is 0.
upDownViewModel.score = 0;
upDownViewModel.streak = 0;

upDownViewModel.cardsLeft = 0;

// functions
upDownViewModel.startNewGame = function() {
    this.set("score", 0);
    this.set("streak", 0);

    this.shuffleCards();

    this.getFirstCard();
}

upDownViewModel.goHigher = function() {
    if(!this.hasMoves())
        return;

    if(this.currentCard < this.nextCard)
        this.goodGuess();
    else
        this.badGuess();

    this.getNextCard();
}

upDownViewModel.goLower = function() {
    if(!this.hasMoves())
        return;

    if(this.currentCard > this.nextCard)
        this.goodGuess();
    else
        this.badGuess();

    this.getNextCard();
}

upDownViewModel.getFirstCard = function() {
    this.currentCardIndex = -1;
    this.getNextCard();
}

upDownViewModel.getNextCard = function() {
    this.currentCardIndex = this.currentCardIndex +1;
    index = this.currentCardIndex;

    this.set("currentCard", this.cards[index]);
    this.nextCard = this.cards[index+1];

    this.set("cardsLeft", this.noOfCards - index -1);
}

upDownViewModel.hasMoves = function() {
    return this.cardsLeft > 0;
}

upDownViewModel.goodGuess = function() {
    this.set("streak", this.streak + 1);
    this.set("score", this.score + this.streak);
}

upDownViewModel.badGuess = function() {
    this.set("streak", 0);
}

upDownViewModel.shuffleCards = function() {
    var cardDeck = [];
    for(var i=0; i<this.noOfCards; i++) {
        cardDeck.push(i+1);
    }

    var shuffledCards = [];
    while(cardDeck.length > 0) {
        var index = getRandom(cardDeck.length);

        var card = cardDeck.splice(index, 1)[0];

        shuffledCards.push(card);
    }

    this.set("cards", shuffledCards);
}


//Exposes the observable object as a module, which can be required from another js file.
module.exports = upDownViewModel;

function getRandom (max) {
    return Math.floor(Math.random() * max);
}