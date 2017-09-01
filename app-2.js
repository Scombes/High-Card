
//Controller that works with game data
var gameController = (function(){

  var gameData, randomNumber, cardObj, card, playerCard, computerCard;

  //Game Object
  var game = {
      playerScore : 0,
      computerScore : 0,
      playerCards : [],
      computerCards: [],
      deck: []
      }

  //Variables that hold the arrays for our suits and ranks. These are in the order of low to high.
  //This is important when it comes to determining the higher card.
  var suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
  var ranks = [2,3,4,5,6,7,8,9,10,"J","K","Q","A"];

  //Function that creates a deck of cards
  var makeDeckCards = function(suits, ranks){
    //Declare empty deck arraay
    var deck = [];
    //loop through each suit, then each rank
    for (var i = 0; i < suits.length; i++) {

      for (var j = 0; j < ranks.length; j++) {
        //Create empty card object
        cardObj = {};
        //Create suit property and assign it the current suit
        cardObj.suit = suits[i];
        //Create a rank property and assign it the current rank
        cardObj.rank = ranks[j];
        //Push new card object to the end of deck array
        deck.push(cardObj);
      }
    }
    //Return the full deck of cards
    return deck;
  }

  //Function retrieves a random card from the deck and then removes it from the game deck array.
   var getCard = function(deck){
     //Generate a random number between 0 and the length of the deck
     randomNumber = Math.floor(Math.random() * deck.length);
     //Assign the card object at the position of the random number in the newDeck array
     card = deck[randomNumber];
     //Remove the card from the newDeck array
     deck.splice(randomNumber, 1);
     //return the card
     return card;
  }



  return {


    resetGame: function(){
      //Create a new deck of cards and assign it to the games deck property
      game.deck = makeDeckCards(suits, ranks);
      //Zero out the rest of the games properties
      game.playerScore = 0;
      game.computerScore = 0;
      game.playerCards = [];
      game.computerCards = [];
    },


    drawCards: function(){
      //Get card for player and computer
      playerCard = getCard(game.deck);
      computerCard = getCard(game.deck);
      //Add cards to player and computer cards array
      game.playerCards.push(playerCard);
      game.computerCards.push(computerCard);
    },


    calcScore: function(){
      //Use array position to determin high card.
      if(ranks.indexOf(playerCard.rank) > ranks.indexOf(computerCard.rank)){

        game.playerScore += 1;

      } else if(ranks.indexOf(playerCard.rank) === ranks.indexOf(computerCard.rank)){
          //If ranks are the same compare the suits to determin winnner.
          if(suits.indexOf(playerCard.suit) > suits.indexOf(computerCard.suit)){
            game.playerScore += 1;
          } else {
            game.computerScore += 1;
          }

      } else {
        game.computerScore += 1;
      }
    },


    getGameData: function(){
      //Get the game data to use to update the UI
      gameData = {
          playerScore : game.playerScore,
          computerScore : game.computerScore,
          playerCard : game.playerCards[game.playerCards.length - 1],
          computerCard: game.computerCards[game.computerCards.length - 1],
          deck: game.deck
      }
      return gameData;
    },


    determinWinner: function(){
      if(game.playerScore ===  game.computerScore){
        return "tie";
      } else if ( game.playerScore >  game.computerScore ){
        return "player";
      } else {
        return "computer";
      }
    }


  }

})();

//Controller that updates UI
var UIController = (function(){

  var DOMstrings = {
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

  var pPanel = document.getElementById(DOMstrings.playerPanel);
  var cPanel = document.getElementById(DOMstrings.computerPanel);


  return {


    resetUI: function(){
      document.getElementById(DOMstrings.drawCard).style.display = "block";
      document.getElementById(DOMstrings.playerPanel).classList.remove('winner');
      document.getElementById(DOMstrings.computerPanel).classList.remove('winner');
      document.getElementById(DOMstrings.playerScore).innerHTML = '0';
      document.getElementById(DOMstrings.computerScore).innerHTML = '0';
      document.querySelector(DOMstrings.playerCardRank).innerHTML = "";
      document.querySelector(DOMstrings.computerCardRank).innerHTML = "";
      document.querySelector(DOMstrings.playerCardSuit).innerHTML = "";
      document.querySelector(DOMstrings.computerCardSuit).innerHTML = "";
      document.querySelector(DOMstrings.cardsLeft).innerHTML = "52";
    },


    updateUI: function(gameData){
      document.getElementById(DOMstrings.playerScore).innerHTML = gameData.playerScore;
      document.getElementById(DOMstrings.computerScore).innerHTML = gameData.computerScore;
      document.querySelector(DOMstrings.playerCardRank).innerHTML = gameData.playerCard.rank;
      document.querySelector(DOMstrings.computerCardRank).innerHTML = gameData.computerCard.rank;
      document.querySelector(DOMstrings.playerCardSuit).innerHTML = gameData.playerCard.suit;
      document.querySelector(DOMstrings.computerCardSuit).innerHTML = gameData.computerCard.suit;
      document.querySelector(DOMstrings.cardsLeft).innerHTML = gameData.deck.length;
    },


    showWinner: function(winner){
      //Hide Draw card button
      document.getElementById(DOMstrings.drawCard).style.display = "none";

      if(winner === "player"){
         pPanel.className += " winner";
      } else if (winner === "computer"){
        cPanel.className += " winner";
      } else if (winner === "tie"){
        pPanel.className += " winner";
        cPanel.className += " winner";
      }
    }


  }

})();

//Controller that works between the game controller and the UI controller
var controller = (function(gameCtrl, UICtrl){
  //Set up event listeners to call getScore function
  var setupEventListeners = function(){
    //User clicks the draw card button
    document.getElementById('draw-card').addEventListener('click', function(event){
        event.preventDefault();
        //Draw Cards
        gameCtrl.drawCards();
        //Calculate Score
        gameCtrl.calcScore();
        //Get game data
        var gameData = gameCtrl.getGameData();
        //Update UI with game data
        UICtrl.updateUI(gameData);

        //If there are no more cards in the deck, then determin the winner
        if(gameData.deck.length === 0){
          var winner = gameCtrl.determinWinner();
          UICtrl.showWinner(winner);
        }
    });

    //User resets game
    document.getElementById('new-game').addEventListener('click', function(event){
        event.preventDefault();
        gameCtrl.resetGame();
        UICtrl.resetUI();
    });

  };


  return  {
    //init function that starts game
    init: function(){
      setupEventListeners();
      gameCtrl.resetGame();
      UICtrl.resetUI();
    }
  }

})(gameController, UIController);

//Start the game on page load. 
controller.init();
