var player, playerSprite, arrow, arrowSprite, bow, bowSprite, backgroundimg, bomb, bombSprite, wall, wall2, running, explode, score, sound1, sound2, floor, invisWall1, invisWall2
var arrowGroup, bombGroup
var play, end, gameState
gameState = "play"

function preload()  {

  player = loadImage("archer.png")
  arrowSprite = loadImage("arrow.png")
  bomb = loadImage("bomb.png")
  backgroundimg = loadImage("bg.jpg")
  running = loadAnimation("running1.png", "running2.png")
  explode = loadImage("explode.png")
  sound1=loadSound("shoot.wav")
  sound2=loadSound("explode.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerSprite=createSprite(300, 770, 30, 175);
  console.log(running)
  playerSprite.addImage("player", player)
  playerSprite.addAnimation("running", running)
  playerSprite.scale = 1.8
  playerSprite.debug = true
  arrowGroup = new Group()
  bombGroup = new Group()
  wall=createSprite(100, 500, 50, 400)
  wall.visible=false
  
  score=0
  floor=createSprite(400, 800, 800, 10)
  floor.visible=false
  invisWall1=createSprite(160, 550, 30, 500)
  playerSprite.setCollider("rectangle", 0, 0, 50, 50)
}

function draw() {
  background(backgroundimg); 

  if(gameState === "play")  {

    if(playerSprite.isTouching(invisWall1))  {
      playerSprite.x=300
    }

    invisWall1.visible=false


  if(keyWentDown("d"))  {

      playerSprite.changeAnimation("running")
      playerSprite.scale=1
  }

  if(keyDown("d"))  {
    playerSprite.x = playerSprite.x+4.5
  }
  if(keyWentDown("a"))  {
 
      playerSprite.changeAnimation("running")
      playerSprite.scale = 1
  }

  if(keyDown("a"))  {
    playerSprite.x = playerSprite.x-3.2
  }

  if(keyWentUp("d"))  {
    playerSprite.changeImage("player")

  }

  if(keyWentUp("a"))  {
    playerSprite.changeImage("player")
  }

  spawnBombs()

  
  textSize(30)
  fill("yellow")
  text("score "+score,400,50)

  if(keyDown("space")) {
    spawnArrow()
    sound1.play()
    //Add a timer here to wait after each click
  }

  if(bombGroup.isTouching(floor)) {
    bombGroup.destroyEach()
    console.log("test")
    gameState="end"
  }

  for(var j=0;j<arrowGroup.length;j++) {
    for(var i=0;i<bombGroup.length;i++) {
      if(arrowGroup.isTouching(bombGroup.get(i)))  {
        bombGroup.get(i).changeImage("explode")
        bombSprite.velocityX=0
        bombSprite.velocityY=0
        arrowGroup.destroyEach()
        score=score+1
        sound2.play()
 
      }
    }
  }
  
 

  for(var i=0;i<bombGroup.length;i++) {
      if(bombGroup.get(i).y===300)  {
        gameState = "end"
      }
  }


  drawSprites()
  }
  
  if(gameState === "end")  {
    textSize(100)
    fill("red")
    text("Gamer Over", 400, 400)
    text.scale(0.5)
  }

}

function spawnBombs() {
  if(frameCount%120===0)  {
    bombSprite = createSprite(900, random(10,250), 50, 50)
    bombSprite.addImage("bomb",bomb)
    bombSprite.addImage("explode", explode)
    console.log(bombSprite)
    bombSprite.scale = 0.4
    bombSprite.lifetime = 150
    bombSprite.velocityX = -5
    bombSprite.velocityY = 5
    bombSprite.setCollider("circle", -10, 20, 100)
    bombGroup.add(bombSprite)


  }
}

function spawnArrow() {
  arrow = createSprite(300, 540, 50, 50)
  arrow.addImage(arrowSprite)
  arrow.scale=0.2
  arrow.x = playerSprite.x
  arrow.y = playerSprite.y

  arrow.velocityY = -5
  arrow.velocityX = 5



}
