
//gameboard 

const tile = 32
const rows = 16
const columns = 20

const areaWidth = tile * columns
const areaHeight = tile * columns

//Love 
const loveHeight = tile*3
const loveWidth = tile + 22
const loveX = tile * columns/5 
const loveY = tile * columns - tile*2

//Hate 
const hateHeight = tile*3
const hateWidth = tile +22
const hateX = tile * columns/1.5
const hateY = tile * columns - tile*2

//enemy 
const enemyHeight = tile*3
const enemyWidth = tile + 22
const enemySpeed = -2

//beams 
const beamArray = []
const beamSpeedY = -10


// class Enemy {
//   constructor(image, enemyHeight, enemyWidth, x, y) {
//     this.image = image 
//     this.height = enemyHeight
//     this.width = enemyWidth
//     this.x = x
//     this.y = y
//   }
// }

// const enemy1 = new Enemy("Images/walking-3.png", enemyHeight, enemyWidth, columns + 100, tile * 4)
// console.log(enemy1.x)
// console.log(enemy1.y)

const players = [
  {
    name: "Love",
    x: loveX,
    y: loveY,
    width: loveWidth,
    height: loveHeight,
  },
  {
    name: "Hate",
    x: hateX,
    y: hateY,
    width: hateWidth,
    height: hateHeight
  },
  {
    name: "cat1",
    x: columns + 530,
    y: tile * 1,
    width: enemyWidth,
    height: enemyHeight,
  },
  {
    name: "cat2",
    x: columns - 20,
    y: tile * 3,
    width: enemyWidth,
    height: enemyHeight,
  },
  {
    name: "cat3",
    x: columns + 530,
    y: tile * 5,
    width: enemyWidth,
    height: enemyHeight,
  },
  {
    name: "cat4",
    x: columns - 20,
    y: tile * 7,
    width: enemyWidth,
    height: enemyHeight,
  }
]
console.log(players[0].x)
const movementX = tile

window.onload = function() {
    const gameArea = document.querySelector("#gamearea")
      gameArea.width = areaWidth
      gameArea.height = areaHeight
    const context = gameArea.getContext("2d")

    // love apperance
    const loveImage = new Image()
    loveImage.src = "Images/Love-Behind.png"
    
    loveImage.onload = () => {
      const hateImage = new Image();
      hateImage.src = "Images/Hate-back.png"
      
      hateImage.onload = () => {
          const enemyImage1 = new Image()
          enemyImage1.src = "Images/walking-3.png"
          
          enemyImage1.onload = () => {
              const enemyImage2 = new Image();
              enemyImage2.src = "Images/walking-2.png"
              
              enemyImage2.onload = () => {
                  const enemyImage3 = new Image()
                  enemyImage3.src = "Images/walking-1.png"
                  
                  enemyImage3.onload = () => {
                      const enemyImage4 = new Image()
                      enemyImage4.src = "Images/walking-2.png"
                      
                      enemyImage4.onload = () => {
                          const updatePlayers = () => {
                              context.clearRect(0, 0, areaWidth, areaHeight)
                              context.drawImage(loveImage, players[0].x, players[0].y, players[0].height, players[0].width)
                              context.drawImage(hateImage, players[1].x, players[1].y, players[1].height, players[1].width)
                              enemyMovement(players[2], 0)
                              context.drawImage(enemyImage1, players[2].x, players[2].y, players[2].height, players[2].width)
                              enemyMovement2(players[3], 0)
                              context.drawImage(enemyImage2, players[3].x, players[3].y, players[3].height, players[3].width)
                              enemyMovement(players[4], .5)
                              context.drawImage(enemyImage3, players[4].x, players[4].y, players[4].height, players[4].width)
                              enemyMovement2(players[5], .5)
                              context.drawImage(enemyImage4, players[5].x, players[5].y, players[5].height, players[5].width)
                              requestAnimationFrame(updatePlayers)


                              for (let i = 0; i < beamArray.length; i++){
                                const beam = beamArray[i]
                                beam.y += beamSpeedY
                                context.fillStyle = "pink"
                                context.fillRect(beam.x, beam.y, beam.width, beam.height)
                          
                              }
                          }
                          requestAnimationFrame(updatePlayers)
                      }
                  }
              }
          }
      }
  }
    
// loveImage.onload = () => {
    //   context.drawImage(loveImage, players[0].x, players[0].y, players[0].height, players[0].width)
    // }
    
    // hate apperance 
    // const hateImage = new Image()
    // hateImage.src = "Images/Hate-back.png"

    // hateImage.onload = () => {
    //   context.drawImage(hateImage, players[1].x, players[1].y, players[1].height, players[1].width)
    // }
    // const enemyImage1 = new Image()
    // enemyImage1.src = "Images/walking-3.png"

    // const enemyImage2 = new Image()
    // enemyImage2.src = "Images/walking-2.png"

    // const enemyImage3 = new Image()
    // enemyImage3.src = "Images/walking-1.png"

    // const enemyImage4 = new Image()
    // enemyImage4.src = "Images/walking-2.png"
    

    // enemyImage1.onload = () =>{
    //   const updateEnemy = () => {
    //     context.clearRect(0, 0, areaWidth, areaHeight)
    //     context.drawImage(enemyImage1, players[2].x, players[2].y, players[2].height, players[2].width)
    //     context.drawImage(enemyImage2, players[3].x, players[3].y, players[3].height, players[3].width)
    //     requestAnimationFrame(updateEnemy)
    //   }
    //   requestAnimationFrame(updateEnemy)
    // }

  //  i can also put it in one function. 
    // loveImage.onload = () => {
    //   hateImage.onload = () => {
    //     const updatePlayers = () => {
    //       context.clearRect(0, 0, areaWidth, areaHeight)
    //       context.drawImage(loveImage, players[0].x, players[0].y, players[0].height, players[0].width)
    //       context.drawImage(hateImage, players[1].x, players[1].y, players[1].height, players[1].width)
    //       requestAnimationFrame(updatePlayers)
    //     }
    //     requestAnimationFrame(updatePlayers)
    //   }
    // }

    
    document.addEventListener("keydown", moveLove)
    document.addEventListener("keyup", loveBeam)
    document.addEventListener("keydown", moveHate)
    document.addEventListener("keyup", hateBeam)

}


const enemyMovement = (cat, speed) => {
  cat.x += enemySpeed - speed
  
  if (enemySpeed < 0 && cat.x + cat.width <= 0) {
    cat.x = areaWidth
  } else if (enemySpeed > 0 && cat.x >= areaWidth) {
    cat.x = -cat.width
  }
}

const enemyMovement2 = (cat, speed) => {
  cat.x -= enemySpeed + speed

  if (cat.x + cat.width <= 0) {
    cat.x = areaWidth
  }
  if (cat.x >= areaWidth) {
    cat.x = -cat.width
  }
}


const moveLove = (l) => {
  if(l.code === "KeyA" && players[0].x - movementX >= 0) {
    //made and fucntion for Love to abe able to move left and right and added if love move >= 0 love cant go further which us off the board.
    players[0].x -= movementX
  }
  else if (l.code === "KeyD" && players[0].x + movementX + players[0].width + 22 <= areaWidth) {
    players[0].x += movementX
  }
}

const moveHate = (h) => {
  if (h.code === "ArrowLeft" && players[1].x - movementX >= 0) {
    players[1].x -= movementX
  }
  else if (h.code === "ArrowRight" && players[1].x + movementX + players[1].width <= areaWidth) {
    players[1].x += movementX
  }
}

const loveBeam = (p) => {
  if(p.code === "KeyW") {
    const heartBeam = {
      x: players[0].x + players[0].width*49/64,
      y: players[0].y,
      width: tile/3,
      height: tile/2,
      hit: false 
    }
    beamArray.push(heartBeam)
  }
}

const hateBeam = (h) => {
  if(h.code === "ArrowUp") {
    const meanBeam = {
      x: players[1].x + players[1].width*49/64,
      y: players[1].y,
      width: tile/3,
      height: tile/2,
      hit: false 
    }
    beamArray.push(meanBeam)
  }
}