//Initialize variables
let suit = ["Hearts", "Spades", "Clubs", "Diamonds"];
let card = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King", "Ace"];
let cardValue = [2,3,4,5,6,7,8,9,10,11,12,13];
let mainDeck = [];

let  player1 = {
    name: "player1",
    deck: [],
    isWinner: false
}

let player2 = {
    name: "player2",
    deck: [],
    isWinner: false
}

//Ace of Hearts, 9 of Hearts
function populateDeck() {
    for(let i=0; i<suit.length; i++) {
        for(let j=0; j<card.length; j++){
            mainDeck.push(card[j] + " of " + suit[i]);
        }
    }
    //console.log(mainDeck);
}

//shuffle cards
function shuffleCards(){
   let tempdeck = [];
   let index = 0;
   
   //generate unique random numbers between 0-52
   for(let i=0; i< 52; i++){
        index = Math.floor(Math.random() * 53);
        while(tempdeck.indexOf(index) !== -1){
            index = Math.floor(Math.random() * 53);
        }
        tempdeck.push(index)   
   }
   console.log(tempdeck)

    
   

}

//divide cards
function dealCards() {
   player1.deck = mainDeck.slice(0,26);
   player2.deck = mainDeck.slice(26);
}

console.log(player1.deck);
console.log(player2.deck);

populateDeck();
shuffleCards();
dealCards();



