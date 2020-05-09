const tiles = document.querySelectorAll('.container div');
let shooterPosition =  202;
let score = 0;
let scoreElement = document.querySelector('h2 span')
let game = setInterval(gameMove,500);
let theOpponents = [0,1,2,3,4,5,6,7,8,9,
                   15,16,17,18,19,20,21,22,23,24,
                   30,31,32,33,34,35,36,37,38,39];
let allCaught = [];
let caught = ['none'];
let movement = [5];
let way = 1;
let shotter = shooterPosition;
let duration = 900;
function shotMove(num){
  for(let i = 0; i < 14; i++){
    duration -= 50;
    setTimeout(function(){
      for(let i = 0; i < tiles.length; i++){
        tiles[i].classList.remove('shot');
      }
      if(caught[0] !== 'none') return;
      num -= 15;
      if(num > 0){
        tiles[num].classList.add('shot');
      }
      if(tiles[num].classList.contains('opponents')){
        caught[0] = theOpponents.indexOf(num);
        allCaught.push(caught[0]);
        score++;
        scoreElement.textContent = score;
      }else{
        console.log('nothing')
      }
    },duration);
  }
  caught[0] = 'none';
  console.log(allCaught);


}
tiles[shooterPosition].classList.add('shooter');

document.addEventListener('keydown',keys);

function keys(e){
   tiles[shooterPosition].classList.remove('shooter');
   if(e.keyCode == 37){
    if(shooterPosition % 15 !== 0) shooterPosition -=1;
  }else if(e.keyCode == 39){
    if(shooterPosition < 209)  shooterPosition  +=1;
  }else if(e.keyCode == 32){
          shotter = shooterPosition;
          shotMove(shotter);
          duration = 900;

  }else{
    console.log('nothing')
  }
   tiles[shooterPosition].classList.add('shooter');
}

function gameMove(){
  theOpponents.forEach(element => {
    tiles[element].classList.remove('opponents');
  })
  if(movement[0] === 0){
    for(let i = 0; i < theOpponents.length; i++){
      theOpponents[i] += 15;
    }
    theOpponents.forEach(element=> {
      tiles[element].classList.add('opponents');
    });
    if(way === 1){
      way = -1
    }else{
      way = 1;
    }
    // caught the opponents
    opponentsCaught();
    //if opponents reached shooter
    opponentsReached();

    return movement[0] += 5;
  }

  for(let i = 0; i < theOpponents.length; i++){
    theOpponents[i] += way;
  }
  theOpponents.forEach(element=> {
    tiles[element].classList.add('opponents');
  });
  movement[0]--;
//caught the opponents
opponentsCaught();
//if opponents reached shooter
opponentsReached();

}

function opponentsCaught(){
  for(let i = 0; i < allCaught.length; i++){
    tiles[theOpponents[allCaught[i]]].classList.remove('opponents');
  }
}
function opponentsReached(){
  for(let i = 0; i < theOpponents.length; i++){
    if((tiles[theOpponents[i]].classList.contains('shooter')) && (tiles[theOpponents[i]].classList.contains('opponents'))){
       clearInterval(game);
    }
  }
}
