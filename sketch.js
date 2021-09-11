var gameState = "start", mangoo, Ground, food, foodgroup, health = 0, zombie, zombiegroup, invisibleground;
function preload() {
 bg = loadImage("bg.jpg")
  zombies=loadImage("zombie.png")
  mangoos=loadImage("m.png")
  f1=loadImage("food1.png")
  f2=loadImage("food2.png")
  f3=loadImage("food3.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  
  ground = createSprite(windowHeight, windowHeight / 2, windowWidth * 2, windowHeight * 2);
  //ground = createSprite(windowWidth / 2,,windowHeight / 2,windowWidth * 2, windowHeight * 2);
  ground.x = ground.width / 2;
 ground.addImage(bg)
 ground.scale = 2.5;
  invisibleground = createSprite(windowWidth / 2, windowHeight, windowWidth, 100)
  foodgroup = new Group();
  zombiegroup = new Group();
  edges = createEdgeSprites()
  mangoo = createSprite(50, windowHeight / 2 + 20, 40, 40)
 mangoo.addImage(mangoos)
 mangoo.scale=0.3 
}

function draw() {
 background(bg);

  textSize(30);
  fill("White")
  text("Health : " + health, 10, 50)
  //string,x,y


  ground.velocityX = -3

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  if (keyDown("left")) {
    mangoo.velocityX = -2
  }

  if (keyDown("right")) {
    mangoo.velocityX = 2
  }
  if (keyDown("up")) {
    mangoo.velocityY = -2
  }
  if (mangoo.isTouching(edges[2]) || mangoo.isTouching(edges[1]) || mangoo.isTouching(edges[0])) {
    console.log("gameover")
  }
  if (keyDown("M")) {
    Shooting()
  }
  mangoo.velocityY = mangoo.velocityY + 0.1
  mangoo.collide(invisibleground)
  foodCreator()
  zombieCreator()
  for (var i = 0; i < zombiegroup.length; i++) {
    if (mangoo.isTouching(zombiegroup.get(i))) {
      health -= 7
      zombiegroup.get(i).destroy();

    }
  }

  //check collision b/w food - foodGroup and mangoo to increase the health
  //for loop - initialize, condition, increment/decrement
  //.length
  for (var i = 0; i < foodgroup.length; i = i + 1) {
    if (mangoo.isTouching(foodgroup.get(i))) {
      health += 5;
      foodgroup.get(i).destroy();
    }
  }
  /*if(mangoo.isTouching(foodgroup)){
   health=health+5
   foodgroup.destroyEach()
  }*/



  drawSprites()
  textSize(30);
  fill("White")
  text("Health : " + health, 10, 50)
  
}
function Shooting() {

  if (frameCount % 60 === 0) {
    obj = createSprite(mangoo.x, mangoo.y, 10, 10)
    obj.velocityX = 2
  }
}

function foodCreator() {
  if (frameCount % 60 === 0) {
    // windowWidth =900
    // 900+100 = x axis to the food
    //random(starting,ending)
    food = createSprite(windowWidth + 100, 70, 10, 10)
    randomnumber=Math.round(random(1,3))
    switch(randomnumber){
   case 1: food.addImage(f1);break;
   case 2: food.addImage(f3);break;
   case 3: food.addImage(f2);break;
  }
    food.scale=0.2
    food.velocityX = -3;
    food.y = Math.round(random(20, windowHeight - 100))
    // lifetime = ? d/s
    food.lifetime = (windowWidth / 3) + 100
    foodgroup.add(food)
  }

}

// create a function for the zombies
function zombieCreator() {
  if (frameCount % 40 === 0) {
    // windowWidth =900
    // 900+100 = x axis to the food
    //random(starting,ending)
    zombie = createSprite(windowWidth + 100, 70, 10, 10);
    zombie.addImage(zombies)
    zombie.scale = 0.3
    zombie.shapeColor = "white"
    zombie.velocityX = -3;
    zombie.y = Math.round(random(20, windowHeight - 100))
    // lifetime = ? d/s
    zombie.lifetime = (windowWidth / 3) + 100
    zombiegroup.add(zombie)
  }

}

//can u hear me?
function blocks() {
  if (frameCouunt % 200 === 0) {
    block = createSprite(windowWidth + 100, 70, 80, 15);
    block.addImage(brickimg)
     
      block.scale = 0.8; 
      block.velocityX = -3; 
      block.y = Math.round(random(100,windowHeight- 200)); 
      block.lifetime = (windowWidth / 3) + 100; 
      brickgroup.add(brick); 
  }
}
