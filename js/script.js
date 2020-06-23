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
fisherman.src = '/Users/koladegureje/Desktop/test-vs-code/IRONHACK/Ironhack1/IronhackProj1/Proj1/images/fishman.png'
let animationId
console.log(animationId)

// ********************* Functions *********************************
function animation() {
    let animationId = window.requestAnimationFrame(animation)

    ctx.drawImage(lake, 0, 0, canvas.height, canvas.width)
    ctx.drawImage(fisherman, 200, 200, 200, 150)
    
}

// ************************  Script **********************************

animation()