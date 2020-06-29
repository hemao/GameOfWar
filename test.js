
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }


function ifExists(num, numArray){
    let myFlag = false

   for(let i=0; i< numArray.length; i++){
       if(numArray[i] === num){
            myFlag = true
       }
   }
   
   return myFlag;

}


let random = [];

for(let i=0; i<= 52 ; i++){
    let index = getRandomInt(0,53)
    console.log(index)
    console.log(ifExists(index,random))
    while(ifExists(index,random)){
        index = getRandomInt(0,53)
        console.log("inside while loop" + index)
    }
    random.push(index)
    
}

console.log("RANDOM" + random)