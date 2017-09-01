
function Game(){
  this.playerScore = 0;
  this.computerScore = 0;
  this.playerCards = [];
  this.computerCards = [];
  this.deck = [];
  this.suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
  this.ranks = [2,3,4,5,6,7,8,9,10,"J","K","Q","A"];


}


Game.prototype.makeDeckCards = function(){

  this.deck = [];
  //loop through each suit, then each rank
  for (var i = 0; i < this.suits.length; i++) {

    for (var j = 0; j < this.ranks.length; j++) {
      //Create empty card object
      var cardObj = {};
      //Create suit property and assign it the current suit
      cardObj.suit = this.suits[i];
      //Create a rank property and assign it the current rank
      cardObj.rank = this.ranks[j];
      //Push new card object to the end of deck array
      this.deck.push(cardObj);
    }
  }


}


Game.prototype.shuffle = function(){

  var i = 0,
      j = 0,
      temp = null;

  for (i = this.deck.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this.deck[i];
    this.deck[i] = this.deck[j];
    this.deck[j] = temp;
  }

}

Game.prototype.getCard = function(){

  //Generate a random number between 0 and the length of the deck
  randomNumber = Math.floor(Math.random() * this.deck.length);
  //Assign the card object at the position of the random number in the newDeck array
  card = this.deck[randomNumber];
  //Remove the card from the newDeck array
  this.deck.splice(randomNumber, 1);
  //return the card
  return card;

}

Game.prototype.drawCards = function(){

  //Get card for player and computer
  playerCard = this.getCard(this.deck);
  computerCard = this.getCard(this.deck);
  //Add cards to player and computer cards array
  this.playerCards.push(playerCard);
  this.computerCards.push(computerCard);

}

Game.prototype.calcScore = function(){

  playerCard = this.playerCards[this.playerCards.length - 1];
  computerCard = this.computerCards[this.computerCards.length - 1];
  //Use array position to determin high card.
  if(this.ranks.indexOf(playerCard.rank) > this.ranks.indexOf(computerCard.rank)){

    this.playerScore += 1;

  } else if(this.ranks.indexOf(playerCard.rank) === this.ranks.indexOf(computerCard.rank)){
      //If ranks are the same compare the suits to determin winnner.
      if(this.suits.indexOf(playerCard.suit) > this.suits.indexOf(computerCard.suit)){
        this.playerScore += 1;
      } else {
        this.computerScore += 1;
      }

  } else {
    this.computerScore += 1;
  }

}

Game.prototype.determinWinner = function(){

  if(this.playerScore ===  this.computerScore){
    return "tie";
  } else if ( this.playerScore >  this.computerScore ){
    return "player";
  } else {
    return "computer";
  }

}

Game.prototype.resetGame = function(){

  this.playerScore = 0;
  this.computerScore = 0;
  this.playerCards = [];
  this.computerCards = [];
  this.deck = [];

}


Game.prototype.getGameData = function(){

  //Get the game data to use to update the UI
  gameData = {
      playerScore : this.playerScore,
      computerScore : this.computerScore,
      playerCard : this.playerCards[this.playerCards.length - 1],
      computerCard: this.computerCards[this.computerCards.length - 1],
      deck: this.deck
  }
  return gameData;

}


function GameUI(){


  this.DOMstrings = {
    drawCard: 'draw-card',
    playerPanel: 'player-panel',
    computerPanel: 'computer-panel',
    playerScore: 'current-0',
    computerScore: 'current-1',
    playerCardRank: '.card-1-rank',
    playerCardSuit: '.card-1-suit',
    computerCardRank: '.card-2-rank',
    computerCardSuit: '.card-2-suit',
    cardsLeft: '.cards-left-value'
  }

  this.pPanel = document.getElementById(this.DOMstrings.playerPanel);
  this.cPanel = document.getElementById(this.DOMstrings.computerPanel);


}

GameUI.prototype.resetUI = function(){

  document.getElementById(this.DOMstrings.drawCard).style.display = "block";
  document.getElementById(this.DOMstrings.playerPanel).classList.remove('winner');
  document.getElementById(this.DOMstrings.computerPanel).classList.remove('winner');
  document.getElementById(this.DOMstrings.playerScore).innerHTML = '0';
  document.getElementById(this.DOMstrings.computerScore).innerHTML = '0';
  document.querySelector(this.DOMstrings.playerCardRank).innerHTML = "";
  document.querySelector(this.DOMstrings.computerCardRank).innerHTML = "";
  document.querySelector(this.DOMstrings.playerCardSuit).innerHTML = "";
  document.querySelector(this.DOMstrings.computerCardSuit).innerHTML = "";
  document.querySelector(this.DOMstrings.cardsLeft).innerHTML = "52";



}

GameUI.prototype.updateUI = function(gameData){

  document.getElementById(this.DOMstrings.playerScore).innerHTML = gameData.playerScore;
  document.getElementById(this.DOMstrings.computerScore).innerHTML = gameData.computerScore;
  document.querySelector(this.DOMstrings.playerCardRank).innerHTML = gameData.playerCard.rank;
  document.querySelector(this.DOMstrings.computerCardRank).innerHTML = gameData.computerCard.rank;
  document.querySelector(this.DOMstrings.playerCardSuit).innerHTML = gameData.playerCard.suit;
  document.querySelector(this.DOMstrings.computerCardSuit).innerHTML = gameData.computerCard.suit;
  document.querySelector(this.DOMstrings.cardsLeft).innerHTML = gameData.deck.length;



}

GameUI.prototype.showWinner = function(winner){

  //Hide Draw card button
  document.getElementById(this.DOMstrings.drawCard).style.display = "none";

  if(winner === "player"){
     this.pPanel.className += " winner";
  } else if (winner === "computer"){
    this.cPanel.className += " winner";
  } else if (winner === "tie"){
    this.pPanel.className += " winner";
    this.cPanel.className += " winner";
  }

}

function setupEventListeners(newGame, newUI){

  document.getElementById('draw-card').addEventListener('click', function(event){
      event.preventDefault();
      newGame.drawCards();
      newGame.calcScore();
      var gameData = newGame.getGameData();
      newUI.updateUI(gameData);

      if(gameData.deck.length === 0){

        var winner = newGame.determinWinner();
        newUI.showWinner(winner);

      }

  });

  document.getElementById('new-game').addEventListener('click', function(event){
      event.preventDefault();
      newGame.resetGame();
      newGame.makeDeckCards();
      newUI.resetUI();

  });

}

//Init Function
var init = function() {
  console.log('Game Has Started!');
  var newGame = new Game();
  var newUI = new GameUI();
  newGame.makeDeckCards();
  newUI.resetUI();

  setupEventListeners(newGame, newUI);

}


//Invoke the init function to start game
init();
