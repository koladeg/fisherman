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
let realFish = [];
let hook = new Image()
hook.src = 'images/hook.png'
// let fish1 = new Image()
// fish1.src = 'images/fish6.png'
let srcfish = {}
srcfish.fish = new Image()
srcfish.fish.src = 'images/fish6.png'
let numberOfFish = 5
hookYaxis = 125
hookXaxis = fishermanEndPosition-1
hookHeight = 15
hookwidth = 10
let imageX = 0
let fishAction = ['caught', 'moving'];
// ********************* Classes *******************************
class Fish {
    constructor(){
        this.height = 48;
        this.width = 48;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * (750 - 350) + 350,
        this.cFrame = 0;
        this.mFrame = 2;  
        this.speed = (Math.random() * 3.5) + 1.5;
        this.action = 'moving'
         
    }
    draw(){
        this.cFrame++;
        if(this.cFrame >= this.mFrame + 1){
          this.cFrame = 0;
        }   
     // (imgObj, imgX, imgY, imgWidth, imgHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)
        ctx.drawImage(srcfish.fish, this.cFrame*this.width,this.mFrame * this.height,this.height,this.width,this.x,this.y, this.height,this.width);
      }
      update(){
          if(this.action === 'moving'){
            if(this.x < canvas.width + this.width){
                this.x += this.speed;
              }else{ 
                  this.x = 0 - canvas.width
                  this.y = Math.random() * (750 - 350) + 350
                } //return fish fish after some time 
          }else if(this.action === 'caught'){
            this.x = hookXaxis
            this.y = hookYaxis
            this.mFrame = 3
          }
      }
      detectCatch(){
        if(fishermanXaxis >= fishermanEndPosition && hookYaxis > 400){ //make sure hook works when inside water
            if (!( hookXaxis > this.x + this.width ||
                hookYaxis + hookHeight < this.y ||
                hookYaxis > this.y + this.height ||
                hookXaxis + hookwidth < this.x
                )) {
               console.log('Got one!!')
               window.cancelAnimationFrame(animationId)
              //  alert('game over')
            }
        }
      }
}
for (let i = 0; i < numberOfFish; i++) {
    realFish.push(new Fish())   
}



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
    // fish.forEach(fh => {
    //     ctx.fillRect(fh.x +=Math.random() * (5 - 2) + 2 , fh.y, fh.width, fh.height )
    // });
    if(hookYaxis > 781){ hookYaxis -= 2}
    ctx.drawImage(hook, fishermanXaxis-1, hookYaxis, hookwidth, hookHeight)
    for (i = 0; i < realFish.length; i++) {
        realFish[i].draw()
        realFish[i].update() 
        realFish[i].detectCatch() 
    }
    if(imageX + 50 > 50 * 3){ imageX = 0}
    // ctx.drawImage(fish1, imageX+=48, 96, 48, 48, 33, 33, 33, 44)
}
function movehook(e){
    if(fishermanXaxis >= fishermanEndPosition && hookYaxis > 145){
        if(e.code == "Space" || e.code == "ArrowUp"){
        hookYaxis -= 30
    }  
    }
}
 

// ************************  Script **********************************
document.onkeydown = movehook
animation()

