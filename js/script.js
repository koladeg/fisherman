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
let realFish = [];
realFish.push(new Fish())
let hook = new Image()
hook.src = 'images/hook.png'
// let fish1 = new Image()
// fish1.src = 'images/fish6.png'
let fish2 = new Image()
fish2.src = 'images/fish7.png'
hookYaxis = 125
hookXaxis = fishermanEndPosition-1
hookHeight = 15
hookwidth = 10
let imageX = 0
// ********************* Classes *******************************
// class Fish {
//     constructor(){
//         this.height = 34;
//         this.width = 50;
//         this.x = 60;
//         this.y = 65;
//         this.cFrame = 0;
//         this.mFrame = 144;
//         this.speed = (Math.random() * 1.5) + 3.5
//     }
// }


// ********************* Functions *******************************
function animation() {
    animationId = window.requestAnimationFrame(animation)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if(fishermanXaxis >= fishermanEndPosition){
        fishermanXaxis = fishermanEndPosition 
        hookYaxis++
    }
    ctx.drawImage(lake, 0, 0, canvas.height, canvas.width)
    ctx.fillStyle = 'white'
    if(fishermanXaxis === fishermanEndPosition)
        ctx.fillRect(fishermanXaxis-1 + hookwidth/2, 195, 3, hookYaxis - 190)
    ctx.drawImage(fisherman, fishermanXaxis++, 120, 200, 150) 
    ctx.fillStyle = 'black'
    fish.forEach(fh => {
        ctx.fillRect(fh.x +=Math.random() * (5 - 2) + 2 , fh.y, fh.width, fh.height )
    });
    if(hookYaxis > 781){ hookYaxis -= 2}
    ctx.drawImage(hook, fishermanXaxis-1, hookYaxis, hookwidth, hookHeight)
    detectCatch()
    // (imgObj, imgX, imgY, imgWidth, imgHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)
    fishTime.draw();
    if(imageX + 50 > 50 * 3){ imageX = 0}
    // ctx.drawImage(fish1, imageX+=48, 96, 48, 48, 33, 33, 33, 44)
    // ctx.drawImage(fish2, imageX+=48, 96, 48, 48, 120, 120, 33, 44)
}
function makeFish() {
    let newFish =  {
        x:-10,
        y: Math.random() * (750 - 350) + 350, 
        width: 20*3, 
        height: 8*3,
     } 
     fish.push(newFish)   
}
var fishTime = {
    height: 34,
    width: 50,
    x: 60,
    y: 65,
    cFrame: 0,
    mFrame: 3,
    image: new Image(),
    src: 'images/fish6.png',
    draw: function(x, y){
      this.cFrame=0;
      this.image.src = this.src;
      if(this.cFrame >= this.mFrame){
        this.cFrame = 0;
      }
      if(this.x < canvas.width + this.width){
        this.x += 3;
      }else{ this.x = 0 - canvas.width} //return fish fish after some time
      ctx.drawImage(this.image, this.cFrame*48,96,48,48,this.x,this.y, this.height,this.width);
    }
  }
function movehook(e){
    if(fishermanXaxis >= fishermanEndPosition && hookYaxis > 145){
        if(e.code == "Space" || e.code == "ArrowUp"){
        hookYaxis -= 30
    }  
    }
}
function detectCatch(){
    if(fishermanXaxis >= fishermanEndPosition && hookYaxis > 400){ //make sure hook works when inside water
        fish.forEach((obs,i) => { //Look at each fish to see if hook gets it?
            if (!( hookXaxis > obs.x + obs.width ||
                hookYaxis + hookHeight < obs.y ||
                hookYaxis > obs.y + obs.height ||
                hookXaxis + hookwidth < obs.x
                )) {
               console.log('Got one!!')
               window.cancelAnimationFrame(animationId)
              //  alert('game over')
            }
          })
    }
    
  }


setInterval( makeFish, Math.random() * (5000 - 500) + 500);
 

// ************************  Script **********************************
document.onkeydown = movehook
animation()

