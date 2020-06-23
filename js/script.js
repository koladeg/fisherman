// window.onload = function() {
//     document.getElementById("start-button").onclick = function() {
//       startGame();
//     };
  
//     function startGame() {
  
//     }
  
//   };
// *******************  Global Variables  ***************************
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let lake = new Image()
lake.src ='images/background.png'
let fisherman = new Image()
let fishermanXaxis = -40
let fishermanEndPosition = (canvas.width/2) 
fisherman.src = 'images/fishman.png'
let animationId
let fish = []
let hook = new Image()
hook.src = 'images/hook.jpg'
// ********************* Functions *******************************
function animation() {
    animationId = window.requestAnimationFrame(animation)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if( fishermanXaxis >= fishermanEndPosition){
        fishermanXaxis = fishermanEndPosition 
    }
    ctx.drawImage(lake, 0, 0, canvas.height, canvas.width)
    ctx.drawImage(fisherman, fishermanXaxis++, 120, 200, 150) 
    fish.forEach(fh => {
        ctx.fillRect(fh.x +=Math.random() * (5 - 2) + 2 , fh.y, fh.width, fh.height )
    });
    ctx.drawImage(hook, fishermanXaxis-1, 125, 10, 15)
}
function makeFish() {
    let newFish =  {
        x:-10,
        y: Math.random() * (750 - 350) + 350, 
        width: 20, 
        height: 8,
     } 
     fish.push(newFish)   
}
setInterval( makeFish, Math.random() * (3000 - 100) + 100);

 

// ************************  Script **********************************

animation()