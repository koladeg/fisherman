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
hookYaxis = 125
hookXaxis = fishermanXaxis-1
hookHeight = 15
hookwidth = 10
// ********************* Functions *******************************
function animation() {
    animationId = window.requestAnimationFrame(animation)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if(fishermanXaxis >= fishermanEndPosition){
        fishermanXaxis = fishermanEndPosition 
        hookYaxis++
    }
    ctx.drawImage(lake, 0, 0, canvas.height, canvas.width)
    ctx.drawImage(fisherman, fishermanXaxis++, 120, 200, 150) 
    fish.forEach(fh => {
        ctx.fillRect(fh.x +=Math.random() * (5 - 2) + 2 , fh.y, fh.width, fh.height )
    });
    if(hookYaxis > 781){ hookYaxis -= 2}
    ctx.drawImage(hook, fishermanXaxis-1, hookYaxis, hookwidth, hookHeight)
    detectCatch()
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
function movehook(e){
    if(hookYaxis < 125){ hookYaxis += 40}
    if(e.code == "Space" || e.code == "ArrowUp"){
        hookYaxis -= 40
    }  
}
function detectCatch(){
    if(fishermanXaxis >= fishermanEndPosition && hookYaxis > 400){ //make sure hook works when inside water
        fish.forEach((obs,i) => { //Look at each fish to see if hook gets it?
            if ( hookXaxis <= obs.x + obs.width &&
                hookYaxis + hookHeight >= obs.y&&
                hookYaxis <= obs.y) {
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
