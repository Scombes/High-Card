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
const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
const ranks = [2,3,4,5,6,7,8,9,10,"J","K","Q","A"];


//Function that returns an array of card objects
function makeDeckCards(suits, ranks){
  //Declare empty deck arraay
  var deck = [];
  //loop through each suit, then each rank
  for (var i = 0; i < suits.length; i++) {

    for (var j = 0; j < ranks.length; j++) {
      //Create empty card object
      var card = {};
      //Create suit property and assign it the current suit
      card.suit = suits[i];
      //Create a rank property and assign it the current rank
      card.rank = ranks[j];
      //Push new card object to the end of deck array
      deck.push(card);
    }
  }
  //Return the full deck of cards
  return deck;
}

//Function retrieves a random card from the deck and then removes it from the deck array.
function getCard(deck){

   var randomNumber, card;

   //Generate a random number between 0 and the length of the deck
   randomNumber = Math.floor(Math.random() * deck.length);
   //Assign the card object at the position of the random number in the newDeck array
   card = deck[randomNumber];
   //Remove the card from the newDeck array
   deck.splice(randomNumber, 1);

   //return the card
   return card;
}

//Function draws cards for player and computer, updates the game object accordingly
function drawCards(){

  var playerCard, computerCard;

    playerCard = getCard(game.deck);
    computerCard = getCard(game.deck);

    game.playerCards.push(playerCard);
    game.computerCards.push(computerCard);



}

//Function determins the winner of the two cards.
function calcScore(){
  //Take the array and get the card object for player and computer
  var playerCard, computerCard;
  playerCard = game.playerCards[game.playerCards.length - 1];
  computerCard = game.computerCards[game.computerCards.length - 1];

  /* To get around the issue with the letter ranks, we can use the fact that the ranks array is in order from lowest to highest rank.
     Instead of comparing the two rank values, we compare their position in the ranks array.
     The same idea is also applied to the Suits.  In the situation where the rank positions are equal, we have to use the suit to determin the winner.
   */

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

}

function determinWinner(){
  //Hide Draw card button
  document.getElementById("draw-card").style.display = "none";

  if(game.playerScore === game.computerScore){
      var d = document.getElementById("player-panel");
        d.className += " winner";
      var e = document.getElementById("computer-panel");
        e.className += " winner";
  } else(game.playerScore > game.computerScore){

      var d = document.getElementById("player-panel");
        d.className += " winner";
  }  else {
    var d = document.getElementById("computer-panel");
      d.className += " winner";
  }

}


function setupEventListeners(){

  document.getElementById('draw-card').addEventListener('click', function(event){
      event.preventDefault();
      //draw cards and save the returned array
      drawCards();
      calcScore();
      updateUI();

      if(game.deck.length === 0){
        //Use the array to calculate the score
        determinWinner();
      }
  });

  document.getElementById('new-game').addEventListener('click', function(event){
      event.preventDefault();
      clearUI();
      resetGame();
  });

}


function updateUI(){
  var playerCard, computerCard;
  playerCard = game.playerCards[game.playerCards.length - 1];
  computerCard = game.computerCards[game.computerCards.length - 1];

  document.getElementById('current-0').innerHTML = game.playerScore;
  document.getElementById('current-1').innerHTML = game.computerScore;
  document.querySelector('.card-1-rank').innerHTML = playerCard.rank;
  document.querySelector('.card-2-rank').innerHTML = computerCard.rank;
  document.querySelector('.card-1-suit').innerHTML = playerCard.suit;
  document.querySelector('.card-2-suit').innerHTML = computerCard.suit;
  document.querySelector('.cards-left-value').innerHTML = game.deck.length;


}



function clearUI(){

  document.getElementById("draw-card").style.display = "block";
  document.getElementById('player-panel').classList.remove('winner');
  document.getElementById('computer-panel').classList.remove('winner');
  document.getElementById('current-0').innerHTML = '0';
  document.getElementById('current-1').innerHTML = '0';
  document.querySelector('.card-1-rank').innerHTML = "";
  document.querySelector('.card-2-rank').innerHTML = "";
  document.querySelector('.card-1-suit').innerHTML = "";
  document.querySelector('.card-2-suit').innerHTML = "";
  document.querySelector('.cards-left-value').innerHTML = "52";


}


function resetGame(){

  //Create a new deck of cards and assign it to the games deck property
  var newDeck = makeDeckCards(suits, ranks);
  game.deck = newDeck;
  //Zero out the rest of the games properties
  game.playerScore = 0;
  game.computerScore = 0;
  game.playerCards = [];
  game.computerCards = [];

}

//Init Function
var init = function() {

  setupEventListeners();
  clearUI();
  resetGame();

}

//Invoke the init function to start game
init();
