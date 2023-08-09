
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


window.onload = function() {
    const gameArea = document.querySelector("#gamearea")
      gameArea.width = areaWidth
      gameArea.height = areaHeight
    const context = gameArea.getContext("2d")


    const loveImage = new Image()
    loveImage.src = "Images/Love-Behind.png"
    
    loveImage.onload = () => {
      context.drawImage(loveImage, players[0].x, players[0].y, players[0].height, players[0].width)
    }
    
    const hateImage = new Image()
    hateImage.src = "Images/Hate-back.png"

    hateImage.onload = () => {
      context.drawImage(hateImage, players[1].x, players[1].y, players[1].height, players[1].width)
    }
}