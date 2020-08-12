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
        this.warPile = []
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
        console.log("Cards in player's deck - " + player1.name + ": " + player1.deck.length + "     " + player2.name + ": " + player2.deck.length)

        
        for(let i=0; i < numCards; i++){
            //draw the top card from player 1's deck
            player1.cardsOnTable[i] = player1.deck.pop();
            //draw the top card from player 2's deck
            player2.cardsOnTable[i] = player2.deck.pop();
        }
       
    }

    flipCards(player1, player2){
        console.log("Players reveal top card!")
        let displayCard = player1.cardsOnTable[player1.cardsOnTable.length-1];
        console.log(player1.name + "'s open card is " + displayCard.printSingleCard())

        displayCard = player2.cardsOnTable[player2.cardsOnTable.length-1];
        console.log(player2.name + "'s open card is " + displayCard.printSingleCard())
    }

    compareCards(player1, player2){

        let openCardIndex = player1.cardsOnTable.length - 1

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


 
    winnerCollectsCards(player1, player2, gameStatus){

        let collectCards = player1.cardsOnTable.concat(player2.cardsOnTable)
        
        if(gameStatus === "war"){
            this.warPile = collectCards.concat(this.warPile)
            player1.cardsOnTable = []
            player2.cardsOnTable = []
        }
                 
        if(player1.isWinner && gameStatus == "normal") { 
            player1.addCardsToDeck(collectCards) 
            player1.cardsOnTable = []
        } else if(player2.isWinner && gameStatus == "normal"){
            player2.addCardsToDeck(collectCards)
            player2.cardsOnTable = []
        } else if(player1.isWinner && gameStatus == "war"){
            player1.addCardsToDeck(this.warPile) 
            player1.cardsOnTable = []
            this.warPile = []
        } else if(player2.isWinner && gameStatus == "war"){
            player2.addCardsToDeck(this.warPile)
            player2.cardsOnTable = []
            this.warPile = []
        }

        collectCards = []
    
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
        console.log(this.deck)
    }

    addCardsToDeck(collectCards){
        console.log(collectCards.length)
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
        
    outer_block: {
        while(player1.deck.length > 0 && player2.deck.length > 0 && this.status !== "GAME OVER"){
            while(this.status == "normal"){               
                    if (player1.deck.length >= 1 && player2.deck.length >=1){
                        deckOfCards.drawCards(1,player1, player2, this.round)
                        deckOfCards.flipCards(player1, player2)
                        
                        if(deckOfCards.compareCards(player1, player2)){
                            deckOfCards.winnerCollectsCards(player1, player2, this.status)    
                            this.status = "normal"
                        }               
                        else {
                            this.status = "war"
                            deckOfCards.winnerCollectsCards(player1, player2, this.status) 
                        }                               
                            this.round = this.round + 1  
                    } else {
                        console.log("Oops! There are not enough cards to continue the game")
                        console.log(player1.name + " has " + player1.deck.length + " cards left and " + player2.name + " has " + player2.deck.length + " cards left!")
                        if(player1.deck.length > player2.deck.length) {
                            console.log(player1.name + " won the Game of War!")   
                        } else {
                            console.log(player2.name + " won the Game of War!")  
                        }
                        this.status = "GAME OVER"
                    }  
                    
            } 

            while(this.status === "war"){
                
                if(player1.deck.length >= 4 && player2.deck.length >=4) {
                    deckOfCards.drawCards(4,player1, player2, this.round)
                    deckOfCards.flipCards(player1, player2)
                    if(deckOfCards.compareCards(player1, player2)){
                        deckOfCards.winnerCollectsCards(player1, player2, this.status) 
                        this.status = "normal"  
                    }               
                    else {
                        this.status = "war"
                        deckOfCards.winnerCollectsCards(player1, player2, this.status) 
                        
                    }       
                    this.round = this.round + 1
                } else {
                    console.log("Oops! There are not enough cards to continue the game")
                    console.log(player1.name + " has " + player1.deck.length + " cards left and " + player2.name + " has " + player2.deck.length + " cards left!")
                    if(player1.deck.length > player2.deck.length) {
                        console.log(player1.name + " has won the Game of War!")   
                    } else {
                        console.log(player2.name + " has won the Game of War!")  
                    }
                    this.status = "GAME OVER"
                }    
            }


        }   

       
    }

    }
}


Game = new Game()
Game.play()
console.log("THIS GAME IS OVER!")

