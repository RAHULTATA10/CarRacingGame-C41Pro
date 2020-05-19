// Game STates

var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Time 
var scorecount = 0;

var bg, road;

var whitecar;
var bluecar, greencar, redcar, yellowcar, pinkcar, purplecar;
var car1, car2, car3, car4, car5, car6;
var usercar;

var leftbigwall, leftbigwallend;
var rightbigwall, rightbigwallend;

var sound1, sound2;

var livespic;
var livespos;
var livescount;
var lives = 5;

var GAMEOVER, gameOver, RESTART, reStart;
var INSTRUCSTART, instrucStart;

function preload() {
  bg = loadImage("../images/car-race-bg.png");
  
  bg.width = 600;
  bg.height = 300;
  
  bluecar = loadImage("../images/car_blue.png");
  greencar = loadImage("../images/car_green.png");
  redcar = loadImage("../images/car_red.png");
  yellowcar = loadImage("../images/car_yellow.png");
  pinkcar = loadImage("../images/car_pink.png");
  purplecar = loadImage("../images/car_purple.png");

  leftbigwallend = loadImage("../images/ground2.png");
  rightbigwallend = loadImage("../images/ground2.png");
  
  whitecar = loadImage("../images/car_white.png")
 
  livespic = loadImage("../images/lives5.png");
  
  sound1 = loadSound("../sounds/racecar2.mp3"); 
  sound2 = loadSound("../sounds/car-crash.mp3");
  
  GAMEOVER = loadImage("../images/gameover.png");
  RESTART = loadImage("../images/restart.png");
  INSTRUCSTART = loadImage("../images/Gamestart.png");
  
}
function setup() {
  
  createCanvas(600, 325);
  road = createSprite(150,110,3000,500);
  road.width = 500;
  road.x = 50 * road.width / 100;
  
  car1 = createSprite(5, 40, 10, 10); 
  car2 = createSprite(5, 80, 10, 10); 
  car3 = createSprite(5, 120, 10, 10);
  car4 = createSprite(5, 160, 10, 10);
  car5 = createSprite(5, 200, 10, 10);
  car6 = createSprite(5, 240, 10, 10);
  
  var ypos = (random(50, 225));
  usercar = createSprite(595, ypos, 50, 50);
  
  rightbigwall  = createSprite(595, 20, 10, 400);
  rightbigwall.rotation = 90;  
  leftbigwall  = createSprite(0, 0, 10, 0);
  leftbigwall.rotation = 90;
  
  livespos = createSprite(450, 275, 25, 25);
  
  gameOver = createSprite(325, 75); 
  gameOver.addAnimation("Game is Over",GAMEOVER);
  gameOver.scale = 2.5;
  gameOver.visible = false;
    
  reStart = createSprite(50, 250);
  reStart.addAnimation("Restart", RESTART);
  reStart.scale = 0.5;
  reStart.visible = false;
  
  instrucStart = createSprite(300, 150, 600, 300);
  instrucStart.scale = 0.63;
  instrucStart.addAnimation("Instructions and Start", INSTRUCSTART);
  instrucStart.visible = true;
  instrucStart.lifetime = 500;
  
  road.addAnimation("Background Road", bg);
  car1.addAnimation("blue car",bluecar);
  car2.addAnimation("pink car",pinkcar);
 
  car3.addAnimation("red car",redcar);
  car4.addAnimation("purple car", purplecar);
  
  car5.addAnimation("green car",greencar);
  car6.addAnimation("yellow car",yellowcar);
  
  allcars = createGroup();
  allcars.add(car1);
  allcars.add(car2);
  allcars.add(car3);
  allcars.add(car4);
  allcars.add(car5);
  allcars.add(car6);
    
  leftbigwall.addAnimation("Big Wall",leftbigwallend);
  rightbigwall.addAnimation("Big Wall",rightbigwallend);
  
  usercar.addAnimation("white car",whitecar);
  
  livespos.addAnimation("lives",livespic);
  livespos.scale = 0.1;   
}
function draw() {
  background(bg);
  
  textSize(18);
  textFont("Verdana");
  textStyle(BOLD);
  stroke("white");
  
  createEdgeSprites();
  
if (mousePressedOver(instrucStart) || mouseIsOver(instrucStart)  )  {

      instrucStart.visible = false;
      gameState = PLAY;             
}  
if (mousePressedOver(reStart)) {
    gameOver.visible = false;  
    reStart.visible = false; 
    road.visible = false; 
    instrucStart.visible = true; 
    
    resettostart();
}    
if(gameState === PLAY){
    instrucStart.visible = false; 
   
    car1.visible = true;
    car2.visible = true;
    car3.visible = true;
    car4.visible = true;
    car5.visible = true;
    car6.visible = true; 
  
    usercar.visible = true; 
    
    sound1.play(); 
      
  //Time
    scorecount = scorecount +     Math.round(World.frameRate/10);
  
  //move the ground
 //move the ground
    road.velocityX = -(6 + 3 * scorecount/1000);
    
    if (road.x < 250){
      road.x = road.width / 2;
    }
  //velocity
    car1.setVelocity(6, 0.4);
    car2.setVelocity(5.5, 0.3);
    car3.setVelocity(5.75, -0.321);
    car4.setVelocity(5.75, 0.43);
    car5.setVelocity(5.5, 0.3);
    car6.setVelocity(5.5, -0.35);   
  
    usercar.setVelocity(-1.5, 0); 
  
    scoreVisible();
}      
else if ( gameState === END ) {
      scoreVisible();
           
      gameOver.visible = true; 
      reStart.visible = true; 
      
      road.visible = false;
      road.velocityX = 0;
      livespos.visible = false;
      usercar.velocityX = 0;
      usercar.visible = false;
      allcars.setVelocityXEach(0); 
      allcars.setLifetimeEach(-1);
      allcars.setVisibleEach(false);
  
}  
if ( usercar.isTouching(leftbigwall)) {
     sound1.pause();
     sound2.pause();
     gameState = END;
     gameOver.visible = true; 
     reStart.visible = true;           
} 
//scale
car1.scale = 0.11;
car2.scale = 0.11;
car3.scale = 0.11;
car4.scale = 0.11;  
car5.scale = 0.11;
car6.scale = 0.11;  
usercar.scale = 0.17;
 
 //Car
 if (car1.isTouching(rightbigwall)) {
    car1.setVelocity(0, 0);
    car1.x = 0;
    car1.y = 80;
    car1.setVelocity(6, -0.3);
  }

 if (car2.isTouching(rightbigwall)) {
    car2.setVelocity(0, 0);
    car1.x = 0;
    car1.y = 120;
    car2.setVelocity(6.75, 0.05);
  }
 
 if (car3.isTouching(rightbigwall)) {
    car3.setVelocity(0, 0);
    car3.x = 0;
    car3.y = 160;
    car3.setVelocity(6.75, 0.121);
  }
 
 if (car4.isTouching(rightbigwall)) {
    car4.setVelocity(0, 0);
    car4.x = 0;
    car4.y = 200;
    car4.setVelocity(6, 0.121);
  }
if (car5.isTouching(rightbigwall)) {
    car5.setVelocity(0, 0);
    car5.x = 0;
    car5.y = 40;
    car5.setVelocity(6, -0.121);
  }  
if (car6.isTouching(rightbigwall)) {
    car6.setVelocity(0, 0);
    car6.x = 0;
    car6.y = 200;
    car6.setVelocity(6, -0.121);
}    
    //usercar statement
      
       if (lives == 5 && allcars.collide(usercar)){
            sound2.play(); 
            usercar.setVelocity(0, 0);
            scorecount = scorecount - 5;                
            lives = lives  - 1;
            usercar.setVelocity(-2.0, 0);              
       } 
       if (lives == 4 && allcars.collide(usercar)){
            sound2.play(); 
            usercar.setVelocity(0, 0);
            scorecount = scorecount - 5;                
            lives = lives  - 1;
            usercar.setVelocity(-2.0, 0);  
       }
       if (lives == 3 && allcars.collide(usercar)){
            sound2.play(); 
            usercar.setVelocity(0, 0);
            scorecount = scorecount - 5;                
            lives = lives;
            usercar.setVelocity(-2.0, 0);  
       }
       if (lives == 2 && allcars.collide(usercar)){
            sound2.play(); 
            usercar.setVelocity(0, 0);
            scorecount = scorecount - 5;                
            lives = lives + 3 - 1;
            usercar.setVelocity(-2.0, 0);  
       }
       if (lives == 1 && allcars.collide(usercar)){
            sound2.play(); 
            usercar.setVelocity(0, 0);
            scorecount = scorecount - 5;                
            lives = lives - 1;
            
       }  
       if ( lives == 0 ) {
             gameState = END;      
       }      
   
  //keys
  if (keyDown("down")) {
    
    usercar.setVelocity(0,3);
  }
  if (keyDown("up")) {
    
    usercar.setVelocity(0,-3);
  }
  if (keyDown("left")) {
    
    usercar.setVelocity(-3.0,0);
  }
  if (keyDown("right")) {
    
    usercar.setVelocity(3.0,0);
  }
        
  drawSprites();  
}  
function scoreVisible () {
    //display score and no. of lives  
  text("Final Score : "+ scorecount, 230, 280);  
  text("Lives : " + lives, 465, 280);  
}
function resettostart() {
       
    road.visible = false;
      
    scorecount = 0;
    lives = 5;
    
    car1.visible = false;
    car2.visible = false;
    car3.visible = false;
    car4.visible = false;
    car5.visible = false;
    car6.visible = false;  
  
    instrucStart.visible = true;
    instrucStart.lifetime = 500;
//    image(INSTRUCSTART,5,5,600,300);
}    
