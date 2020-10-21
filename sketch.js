var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var ground,groundImage;
var FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(600, 200);

  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
 // edges = createEdgeSprites();

  monkey.scale = 0.12  ;
  monkey.x = 50

  ground = createSprite(200,200,800,20);
  ground.velocityX = 0.1;
  
  //create Obstacle and banana Groups
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  //monkey.setCollider("circle",1,1,40);
 //monkey.debug = true
    
}


function draw() {
 //set background color 
  background("white");
  
  //displaying score
  stroke("black");
  textSize(20);
  fill("white")
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){

    
    //move the ground
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >=100) {
        monkey.velocityY = -10;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.7
  
    //spawn the bananas
    
   // if (FoodGroup.isToching(monkey)){
   // FoodGroup.destroyEach();
    //}
  
    //spawn obstacles on the ground
    spawnobstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
  }
   else if (gameState === END) {
     
     
      ground.velocityX = 0;
      monkey.velocityY  = 0;
     obstaclesGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
   
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
   }

  
  
  
  
   //stroke("black");
  //textSize(20);
  //fill("black")
 // survivlTime = Math.ceil(frameCount/frameRate())
 // text("survivalTime: "+ SurvivalTime, 500,50);
  
 

 
  //Spawn bananas
  spawnbananas();
  
  //Spawn obstacles
  spawnobstacles();


 //stop monkey from falling down
  monkey.collide(ground) 
 drawSprites();
     
}

//function to spawn the bananas
function spawnbananas(){
 // write your code here 
  if (frameCount % 80 === 0){  
  banana = createSprite(300,110,10  ,5);
  banana.addImage (bananaImage)
   banana.y = Math.round (random( 30,60))
  banana.scale = 0.1      
  banana.velocityX = -3
   banana.lifetime = 100
  banana.depth = monkey.depth   
  monkey.depth = monkey.depth+1
  //adding banana to the group
   FoodGroup.add(banana);
      
  }
}

//function to spawn the obstacles
function spawnobstacles(){
 // write your code here 
  if (frameCount % 60 === 0){  
  obstacle = createSprite(400,175,10,40 );
  obstacle.addImage (obstacleImage)
  var rand = Math.round (random( 1,6))
  obstacle.scale = 0.1      
  obstacle.velocityX = -6
  //obstacle.depth = monkey.depth   
  //monkey.depth = monkey.depth+1
     //adding obstacle to the group
   obstaclesGroup.add(obstacle);
    
  }
}









