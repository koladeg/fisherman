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
let itsCaught = false
let hook = new Image()
let points = 0
hook.src = 'images/hook.png'
let fishtype = ['smalyel','bigyel','smlbrn','bigbrn','blue','pink', 'odd','grey' ]
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
let fishing = true
// let timeMeter = document.querySelector('.time').innerText

// ********************* Class *******************************
class Fish {
    constructor(){
        this.height = 48;
        this.width = 48;
        this.caught = false
        this.notreleased = true
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * (750 - 350) + 350,
        this.Framex = 0;
        this.Framey = 2;
        this.speed = (Math.random() * 3.5) + 1.5;
        this.action = 'moving'
        this.fishtype = fishtype[Math.floor(Math.random() * fishtype.length)]
        if (this.fishtype === 'smalyel') {
            this.Framex = 0;
            this.Framey = 2;
            this.minFrame = 0;
            this.maxFrame = 2;
        }else if (this.fishtype === 'bigyel') {
            this.Framex = 3;
            this.Framey = 2;
            this.minFrame = 3;
            this.maxFrame = 5;
        }else if (this.fishtype === 'smalbrn') {
            this.Framex = 6;
            this.Framey = 2;
            this.minFrame = 6;
            this.maxFrame = 8;
        }else if (this.fishtype === 'bigbrn') {
            this.Framex = 9;
            this.Framey = 2;
            this.minFrame = 9;
            this.maxFrame = 11;
        }else if (this.fishtype === 'blue') {
            this.Framex = 0;
            this.Framey = 6;
            this.minFrame = 0;
            this.maxFrame = 2;
        }else if (this.fishtype === 'pink') {
            this.Framex = 3;
            this.Framey = 6;
            this.minFrame = 3;
            this.maxFrame = 5;
        }else if (this.fishtype === 'odd') {
            this.Framex = 6;
            this.Framey = 6;
            this.minFrame = 6;
            this.maxFrame = 8;
        }else if (this.fishtype === 'grey') {
            this.Framex = 9;
            this.Framey = 6;
            this.minFrame = 9;
            this.maxFrame = 11;
        }
    }
    draw(){
     // (imgObj, imgX, imgY, imgWidth, imgHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)
        ctx.drawImage(srcfish.fish, this.Framex*this.width,this.Framey * this.height,this.height,this.width,this.x-24,this.y, this.height,this.width);
        if(this.Framex < this.maxFrame){this.Framex++;}
        else{ this.Framex = this.minFrame}
      }
      update(){
          if(this.action === 'moving'){
            if(this.x < canvas.width + this.width){
                this.x += this.speed;
              }else{
                  this.x = 0 - canvas.width
                  this.y = Math.random() * (750 - 350) + 350
                } //return fish fish after some time
          }else if(this.action === 'caught' && !this.caught){ //Only gets called once
            this.x = hookXaxis
            this.y = hookYaxis
            this.caught = true
            this.Framey += 1
          } else { //Gets called alot
            this.x = hookXaxis
            this.y = hookYaxis
          }
      }
      fishValues(){
        return 5
      }
      detectCatch(){
        if(fishermanXaxis >= fishermanEndPosition && hookYaxis > 400 && fishing){ //make sure hook works when inside water
            if (!( hookXaxis > this.x + this.width ||
                hookYaxis + hookHeight < this.y ||
                hookYaxis > this.y + this.height ||
                hookXaxis + hookwidth < this.x
                )) {
               console.log('Got one!!')
               this.action = 'caught'
               fishing = false
            //    window.cancelAnimationFrame(animationId)
            }
        }   
      }
      backAgain(){
        if(this.action === 'caught' && hookYaxis <= 130){//Add points and return fish to lake
            this.action = 'moving'
            this.caught = false
            fishing = true
            this.Framey -= 1
            this.x = 0 - canvas.width
            this.y = Math.random() * (750 - 350) + 350
            addPoints(this.fishValues())    
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
        ctx.fillRect(fishermanXaxis-1 + hookwidth/2, 125, 3, hookYaxis - 125)
    ctx.drawImage(fisherman, fishermanXaxis++, 120, 200, 150)
    ctx.fillStyle = 'black'
    
    if(hookYaxis > 781){ hookYaxis -= 2}
    ctx.drawImage(hook, fishermanXaxis-1, hookYaxis, hookwidth, hookHeight)
    for (i = 0; i < realFish.length; i++) {
        realFish[i].backAgain()
        if(realFish[i].backAgain()){i
            tsCaught = false
            points+= 10
         }
        console.log(points)
        realFish[i].draw()
        realFish[i].update()
        let isit = realFish[i].points
        console.log(points)
        realFish[i].detectCatch()
        // if(isit === true){itsCaught = true}// stop other fish from getting caugth
        // if(itsCaught){
        //     realFish[i].detectCatch()
        // }    
    }
    if(points > 5){
        window.cancelAnimationFrame(animationId)
        alert('You won')
        location.reload()
    }
    if(imageX + 50 > 50 * 3){ imageX = 0}
    // ctx.drawImage(fish1, imageX+=48, 96, 48, 48, 33, 33, 33, 44)
}
function addPoints(num){
    let score = document.querySelector('#points')
    console.log('add points', num, points)
    let currentPoints = Number(score.innerText)
    currentPoints += num
    points = currentPoints
    score.innerText = currentPoints
}
function movehook(e){
    if(fishermanXaxis >= fishermanEndPosition && hookYaxis > 145){
        if(e.code == "Space" || e.code == "ArrowUp"){
        hookYaxis -= 30
    }
    }
}
function countdown(minutes) {
    var seconds = 60;
    var mins = 5
    function tick() {
        let counter = document.getElementById("time");
        let current_minutes = mins-1
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if(counter.innerHTML === '0:00'){window.cancelAnimationFrame(animationId)}
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            if(mins > 1){
                countdown(mins-1);
            }
        }
    }
    tick();
}
//You can use this script with a call to onclick, onblur or any other attribute you would like to use.
countdown();
// ************************  Script **********************************
document.onkeydown = movehook
animation()