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

//points tally




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
    points: 0
  },
  {
    name: "Hate",
    x: hateX,
    y: hateY,
    width: hateWidth,
    height: hateHeight,
    points: 0
  },
  {
    name: "cat1",
    x: columns + 530,
    y: tile * 1,
    width: enemyWidth,
    height: enemyHeight,
    alive: true
  },
  {
    name: "cat2",
    x: columns - 20,
    y: tile * 3,
    width: enemyWidth,
    height: enemyHeight,
    alive: true
  },
  {
    name: "cat3",
    x: columns + 530,
    y: tile * 5,
    width: enemyWidth,
    height: enemyHeight,
    alive: true
  },
  {
    name: "cat4",
    x: columns - 20,
    y: tile * 7,
    width: enemyWidth,
    height: enemyHeight,
    alive: true
  }
]

// setting the score board in the game by grabbing it from HTML ELemennts 
let lovePoints = players[0].points
let hatePoints = players[1].points

const lovePointsTally = document.querySelector("#lovePoints")
const hatePointTally = document.querySelector("#hatePoints")

console.log(players[1].x)
console.log(players[0].x)
const movementX = tile


window.onload = function() {
    const gameArea = document.querySelector("#gamearea")
      gameArea.width = areaWidth
      gameArea.height = areaHeight
    const context = gameArea.getContext("2d")
    // document.querySelector("#GameOpeningaudio").play()

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
                              lovePointsTally.textContent = lovePoints
                              hatePointTally.textContent = hatePoints

                              context.clearRect(0, 0, areaWidth, areaHeight)
                              context.drawImage(loveImage, players[0].x, players[0].y, players[0].height, players[0].width)
                              context.drawImage(hateImage, players[1].x, players[1].y, players[1].height, players[1].width)
                              if (players[2].alive) {
                              enemyMovement(players[2], 0)
                              context.drawImage(enemyImage1, players[2].x, players[2].y, players[2].height, players[2].width)
                              } else {
                                respawnCat(players[2])
                              }
                              if (players[3].alive) {
                              enemyMovement2(players[3], 0)
                              context.drawImage(enemyImage2, players[3].x, players[3].y, players[3].height, players[3].width)
                              } else {
                                respawnCat(players[3])
                              }
                              if (players[4].alive) {
                              enemyMovement(players[4], .5)
                              context.drawImage(enemyImage3, players[4].x, players[4].y, players[4].height, players[4].width)
                              } else {
                                respawnCat(players[4])
                              }
                              if (players[5].alive) {
                              enemyMovement2(players[5], .5)
                              context.drawImage(enemyImage4, players[5].x, players[5].y, players[5].height, players[5].width)
                              } else{
                                respawnCat(players[5])
                              }
                              requestAnimationFrame(updatePlayers)


                              for (let i = 0; i < beamArray.length; i++){
                                const beam = beamArray[i]
                                beam.y += beamSpeedY
                                context.fillStyle = "pink"
                                context.fillRect(beam.x, beam.y, beam.width, beam.height)

                                for (let j = 2; j < players.length; j++) {
                                  const cat = players[j]
                                  if (cat.alive && detectCollision(beam, cat)) {
                                    beam.hit = true
                                    cat.alive = false
                                    console.log(cat.alive)

                                    if (beam.shooter === "Love" && cat.alive === false) {
                                      lovePoints += 1
                                      hitByLove()
                                    } else if (beam.shooter === "Hate" && cat.alive === false){
                                      hatePoints += 1
                                      hitByHate()
                                    } else {
                                      console.log("notworking")
                                    }
                                  
                                   console.log(lovePoints)
                                   console.log(hatePoints)

                                    if(lovePoints === 5) {
                                      winner = "Love"
                                      loveWin()
                                      // gameRestart()
                                    } else if (hatePoints === 5) {
                                      winner = "hate"
                                      hateWin()
                                    }
                                  }
                                }
                              
                              while(beamArray.length > 0 && (beamArray[0].hit || beamArray[0].y < 0)) {
                                beamArray.shift()
                                console.log(beamArray)
                              }
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
      hit: false, 
      shooter: players[0].name,
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
      hit: false,
      shooter: players[1].name
    }
    beamArray.push(meanBeam)
  }
}


const detectCollision = (a, b) => {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y
}

const respawnCat = (cat) => {
  cat.alive = true
  cat.x = areaWidth
}

const gameRestart = () => {

  //reset point 
  lovePoints = 0
  hatePoints = 0

  //place player on the starting location 
   players[0].x = loveX
   players[0].y = loveY
   players[1].x = hateX
   players[1].y = hateY

   const targetWinBoard = document.querySelector(".winboard")
   targetWinBoard.innerHTML = null
   targetWinBoard.style.backgroundColor = null
   targetWinBoard.style.color = null

   const targetbutton = document.querySelector(".boardbutton")
   targetbutton.innerHTML = null
}

const hitByLove = () => {
  const targetAlertCat = document.querySelector(".alertCat")
  const happyCat = '<img src ="/Users/hiro/GA/projects/Love-Hate-Project-1/Images/Happy-cat.png" />'
  const happySaying = ["I LOVE CODING", "I LOVE JAVASCRIPT!", "I LOVE TO HELP PEOPLE", "I LOVE MYSELF", "I LOVE ROM-COM"]
  const randomStatement = Math.floor(Math.random() * happySaying.length)

  targetAlertCat.innerHTML = happySaying[randomStatement] + happyCat
  
}

const hitByHate = () => {
  const targetAlertCat = document.querySelector(".alertCat")
  const angryCat = '<img src ="/Users/hiro/GA/projects/Love-Hate-Project-1/Images/Angry-cat.png" />'
  const angrySaying = ["I HATE CODING", "I HATE JAVASCRIPT", "I LOVE SEEING PEOPLE SUFFER", "I HATE MYSELF", "I HATE ROM-COM"]
  const randomStatement = Math.floor(Math.random() * angrySaying.length)
  targetAlertCat.innerHTML = angrySaying[randomStatement] + angryCat
}

const loveWin = () => {
  const targetWinBoard = document.querySelector(".winboard")
  const targetbutton = document.querySelector(".boardbutton")
  const victoryLove = '<img src ="/Users/hiro/GA/projects/Love-Hate-Project-1/Images/Love-Victory.png" style = "margin-top: 1rem";/> '
  const romanticMovie = '<img src ="/Users/hiro/GA/projects/Love-Hate-Project-1/Images/romantic-sample.jpg" /> '
  const button = '<button class= "restartB" style= "background-color: #EA4C89; color: #FFFFFF;">PLAY AGAIN</button>'
  
  targetWinBoard.style.backgroundColor = "#bc62b8"
  targetWinBoard.style.color = "#C1F0F4"
  
  targetWinBoard.innerHTML = romanticMovie + '<p>LOVE WIN AND RECCOMENDED</p>' + victoryLove
  targetbutton.innerHTML = button

  const targetReset = document.querySelector(".restartB")

  targetReset.addEventListener("click", gameRestart)

}

const hateWin = () => {
  const targetWinBoard = document.querySelector(".winboard")
  const targetbutton = document.querySelector(".boardbutton")
  const victoryHate = '<img src ="/Users/hiro/GA/projects/Love-Hate-Project-1/Images/Hate-Victory.png" style = "margin-top: 1rem";/> '
  const revengeMovie = '<img src ="/Users/hiro/GA/projects/Love-Hate-Project-1/Images/revenge-sample.jpg" /> '
  const button = '<button class= "restartB" style= "background-color: #EA4C89; color: #FFFFFF;">PLAY AGAIN</button>'
  
  targetWinBoard.style.backgroundColor = "#bc62b8"
  targetWinBoard.style.color = "#C1F0F4"
  
  targetWinBoard.innerHTML = revengeMovie + '<p>HATE WIN AND RECCOMENDED</p>' + victoryHate
  targetbutton.innerHTML = button

  const targetReset = document.querySelector(".restartB")

  targetReset.addEventListener("click", gameRestart)

}