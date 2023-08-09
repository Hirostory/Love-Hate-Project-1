
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
  }
]

const movementX = tile

window.onload = function() {
    const gameArea = document.querySelector("#gamearea")
      gameArea.width = areaWidth
      gameArea.height = areaHeight
    const context = gameArea.getContext("2d")

    // love apperance
    const loveImage = new Image()
    loveImage.src = "Images/Love-Behind.png"
    
    // loveImage.onload = () => {
    //   context.drawImage(loveImage, players[0].x, players[0].y, players[0].height, players[0].width)
    // }
    
    // hate apperance 
    const hateImage = new Image()
    hateImage.src = "Images/Hate-back.png"

    // hateImage.onload = () => {
    //   context.drawImage(hateImage, players[1].x, players[1].y, players[1].height, players[1].width)
    // }

    //i can also put it in one function. 
    loveImage.onload = () => {
      hateImage.onload = () => {
        const updatePlayers = () => {
          context.clearRect(0, 0, areaWidth, areaHeight)
          context.drawImage(loveImage, players[0].x, players[0].y, players[0].height, players[0].width)
          context.drawImage(hateImage, players[1].x, players[1].y, players[1].height, players[1].width)
          requestAnimationFrame(updatePlayers)
        }
        requestAnimationFrame(updatePlayers)
      }
    }

    document.addEventListener("keydown", moveLove)
    document.addEventListener("keydown", moveHate)
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