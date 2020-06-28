class Card {
    constructor(suit, rank, score) {
        this.suit = suit
        this.rank = rank
        this.score = score           
    }

    printSingleCard(){
        return this.suit + " of " + this.rank + " - Score: " + this.score
    }
}

class DeckOfCards {
    constructor() {
        this.deck = []
        this.suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds']
        this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
        this.scores = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        this.length = 52
    }

    createDeck() {
        for (let i = 0; i < this.suits.length; i++) {
            for (let j = 0; j < this.ranks.length; j++) {
                this.deck.push(new Card(this.ranks[j],this.suits[i],this.scores[j]))
            }
        }
    }

    shuffleCards() {
       shuffleHelper = new shuffleHelper();
       let tempDeck = shuffleHelper.random;
       console.log(tempDeck)
       for(let i=0; i< 52 ; i++){
            tempDeck[i]=this.deck[tempDeck[i]]
       }
       this.deck = tempDeck
            
    }

    dealOut(player1, player2) {
        player1.deck = this.deck.slice(0,26);
        player2.deck = this.deck.slice(26);
    }

    printDeck(){
        console.log(this.deck)
    }

    drawCards(numCards, player1, player2, round){
        console.log("Round: " + round)
        console.log(player1.name + ": " + player1.deck.length + "     " + player2.name + ": " + player2.deck.length)

        //printing top card of each DECK
        /*
        let topCard = player1.deck[player1.deck.length - 1]
        console.log(player1.name + "'s open card is " + topCard.printSingleCard())
        topCard = player2.deck[player2.deck.length - 1]
        console.log(player2.name + "'s open card is " + topCard.printSingleCard())
        */

        for(let i=0; i < numCards; i++){
            //draw the top card from player 1's deck
            player1.cardsOnTable[i] = player1.deck.pop();
            //draw the top card from player 2's deck
            player2.cardsOnTable[i] = player2.deck.pop();
        }
        /*
        let displayCard = player1.cardsOnTable[player1.cardsOnTable.length-1];
        console.log("Round: " + round)
        console.log(player1.name + "'s open card is " + displayCard.printSingleCard())

        displayCard = player2.cardsOnTable[player2.cardsOnTable.length-1];
        console.log(player2.name + "'s open card is " + displayCard.printSingleCard())
        */
    }

    flipCards(player1, player2){
        let displayCard = player1.cardsOnTable[player1.cardsOnTable.length-1];
         console.log(player1.name + "'s open card is " + displayCard.printSingleCard())

        displayCard = player2.cardsOnTable[player2.cardsOnTable.length-1];
        console.log(player2.name + "'s open card is " + displayCard.printSingleCard())
    }

    compareCards(player1, player2){
        let openCardIndex = player1.cardsOnTable.length-1
        let score1 = player1.cardsOnTable[openCardIndex].score //player1's open card score
        let score2 = player2.cardsOnTable[openCardIndex].score //player2's open card score

        if (score1 > score2){
            console.log(player1.name + " is the winner. Winning card's score is "+ score1)   
            player1.isWinner = true
            player2.isWinner = false   
            return true   
            
        } else if (score2 > score1){
            console.log(player2.name + " is the winner. Winning card's score is "+ score2)
            player2.isWinner = true
            player1.isWinner = false
            return true
            
        } else if (score1 === score2){
            console.log("Both player's chose cards with same score! War begins!")
            player1.isWinner = false
            player2.isWinner = false
            return false
            
        }
    }

    winnerCollectsCards(player1, player2){

        let collectCards = player1.cardsOnTable.concat(player2.cardsOnTable)
        console.log("number of cards pulled out:" + collectCards.length)
        console.log(collectCards)
                 
        if(player1.isWinner) { 
            player1.addCardsToDeck(collectCards)
        } else {
            player2.addCardsToDeck(collectCards)
        }    
    

    }

}

class Player {
    constructor(name){
        this.name =  name
        this.deck = []
        this.cardsOnTable = []   
        this.isWinner = false
  
    }

    clearCardsOnTable(){
        for(let i=0; i< this.cardsOnTable.length; i++){
            this.cardsOnTable.pop()
        }
    }

    printDeck(){
        console.log(this.name + " has " + this.deck.length + " cards in deck" )
        console.log(this.deck)
    }

    addCardsToDeck(collectCards){
        for(let i=0; i< collectCards.length; i++){
            this.deck.unshift(collectCards[i])
        }

        this.clearCardsOnTable()
           
    }
}

class shuffleHelper {

    constructor(){
        this.random = [];
        for(let i=0; i< 52 ; i++){
            let index = this.getRandomInt(0,52)
            while(this.ifExists(index,this.random)){
                index = this.getRandomInt(0,52)
            }
            this.random.push(index)   
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    ifExists(num, numArray){
       let myFlag = false
    
       for(let i=0; i< numArray.length; i++){
           if(numArray[i] === num){
                myFlag = true
           }
       }   
       return myFlag;
    }
}

class Game {
    constructor(){
        this.round = 1
        this.status = "normal"
    }

    play(){
        
        let deckOfCards = new DeckOfCards()

        deckOfCards.createDeck()
        deckOfCards.shuffleCards()
        let player1 = new Player("Mickey")
        let player2 = new Player("Minnie")

        deckOfCards.dealOut(player1, player2)

        while(player1.deck.length !== 0 && player2.deck.length !== 0){

            while(this.status == "normal"){
                deckOfCards.drawCards(1,player1, player2, this.round)
                deckOfCards.flipCards(player1, player2)
                if(deckOfCards.compareCards(player1, player2)){
                    this.status = "normal"
                    deckOfCards.winnerCollectsCards(player1, player2)    
                }               
                else {
                    this.status = "war"
                }       
            
                this.round = this.round + 1

            } 

            while(this.status === "war"){
                deckOfCards.drawCards(4,player1, player2, this.round)
                deckOfCards.flipCards(player1, player2)

                if(deckOfCards.compareCards(player1, player2)){
                    this.status = "normal"
                    deckOfCards.winnerCollectsCards(player1, player2)    
                }               
                else {
                    this.status = "war"
                }       
            
                this.round = this.round + 1
            }


        }           
    }
}

Game = new Game()
Game.play()


/*

    for(let i=0; i<suit.length; i++) {
        for(let j=0; j<card.length; j++){
            sCard.name = card[j] + " of " + suit[i];
            sCard.value = cardValue[j];
            cards.push(sCard);
            sCard= new Object()
            mainDeck.push(card[j] + " of " + suit[i]);
            console.log("\"" + card[j] + " of " + suit[i] + "\" :" +  cardValue[j])
        }
    }


    
class Card {
    constructor() {
        this.suit = ['hearts', 'spades', 'clubs', 'diamonds']
        this.rank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
        this.scores = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    }
}
class Deck {
    constructor() {
        this.deckLength = 52
        this.cards = []
    }
    draw() {
        // draw a random card
    }
    createCards() {
        let card = new Card()
        let suits = card.suit
        let ranks = card.rank
        let scores = card.scores
        for (let i = 0; i < suits.length; i++) {
            const suit = suits[i];
            for (let j = 0; j < ranks.length; j++) {
                const rank = ranks[j];
                const cards = this.cards
                let singleCard = {
                    name: `${rank} of ${suit}`,
                    score: scores[j]
                }
                // console.log(singleCard)
                cards.push(singleCard)
            }
        }
        // console.log(this.cards)
    }
}
let deck1 = new Deck()
deck1.createCards()
deck1.cards.forEach(card => console.log(card))

let suit = ["Hearts", "Spades", "Clubs", "Diamonds"];
let card = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King", "Ace"];
let cardValue = [2,3,4,5,6,7,8,9,10,11,12,13,14];
let mainDeck = [];
let tempDeck = [];

let nCards = {
        "Two of Hearts" :2,
        "Three of Hearts" :3,
        "Four of Hearts" :4,
        "Five of Hearts" :5,
        "Six of Hearts" :6,
        "Seven of Hearts" :7,
        "Eight of Hearts" :8,
        "Nine of Hearts" :9,
        "Ten of Hearts" :10,
        "Jack of Hearts" :11,
        "Queen of Hearts" :12,
        "King of Hearts" :13,
        "Ace of Hearts" :14,
        "Two of Spades" :2,
        "Three of Spades" :3,
        "Four of Spades" :4,
        "Five of Spades" :5,
        "Six of Spades" :6,
        "Seven of Spades" :7,
        "Eight of Spades" :8,
        "Nine of Spades" :9,
        "Ten of Spades" :10,
        "Jack of Spades" :11,
        "Queen of Spades" :12,
        "King of Spades" :13,
        "Ace of Spades" :14,
        "Two of Clubs" :2,
        "Three of Clubs" :3,
        "Four of Clubs" :4,
        "Five of Clubs" :5,
        "Six of Clubs" :6,
        "Seven of Clubs" :7,
        "Eight of Clubs" :8,
        "Nine of Clubs" :9,
        "Ten of Clubs" :10,
        "Jack of Clubs" :11,
        "Queen of Clubs" :12,
        "King of Clubs" :13,
        "Ace of Clubs" :14,
        "Two of Diamonds" :2,
        "Three of Diamonds" :3,
        "Four of Diamonds" :4,
        "Five of Diamonds" :5,
        "Six of Diamonds" :6,
        "Seven of Diamonds" :7,
        "Eight of Diamonds" :8,
        "Nine of Diamonds" :9,
        "Ten of Diamonds" :10,
        "Jack of Diamonds" :11,
        "Queen of Diamonds" :12,
        "King of Diamonds" :13,
        "Ace of Diamonds" :14
}


let  player1 = {
    name: "player1",
    deck: [],
    cardsOnTable: [],
    openCard: "",
    isWinner: false

}


let player2 = {
    name: "player2",
    deck: [],
    cardsOnTable: [],
    openCard: "",
    isWinner: false
}

let cards = [];
let sCard= new Object();

//Ace of Hearts, 9 of Hearts
function populateDeck() {
    for(let i=0; i<suit.length; i++) {
        for(let j=0; j<card.length; j++){
            sCard.name = card[j] + " of " + suit[i];
            sCard.value = cardValue[j];
            cards.push(sCard);
            sCard= new Object()
            mainDeck.push(card[j] + " of " + suit[i]);
            console.log("\"" + card[j] + " of " + suit[i] + "\" :" +  cardValue[j])
        }
    }
    console.log(cards);
}

//shuffle cards
function shuffleCards(){
   let index = 0;   
   //generate unique random numbers between 0-52
   for(let i=0; i< 52; i++){
        index = Math.floor(Math.random() * 53);
        while(tempDeck.indexOf(index) !== -1){
            index = Math.floor(Math.random() * 53);
        }
        tempDeck.push(mainDeck[index])   
   }   
}

//divide cards
function dealCards() {
   player1.deck = tempDeck.slice(0,26);
   player2.deck = tempDeck.slice(26);
}


function drawCard(player){
    console.log(player.deck[0])  
    console.log(player.name)
    player.cardsOnTable.push(player.deck[0])
    player.openCard = player.deck[0]
}

function compareValues(){
    
    if (player1.openCard === player2.openCard){
        console.log("Both cards are equal! War begins!")
    } else {
        
    } 

   // console.log
}

populateDeck();
shuffleCards();
dealCards();

drawCard(player1)
drawCard(player2)
compareValues()

*/


