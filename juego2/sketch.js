var player, back;
var points = 0;
var backImg1;
var backImg2;
var leftPlayerImg;
var rightPlayerImg;
var gameState= "0";
var baseImg, baseGroup;
var goodImg, goodThingsGroup;
var badImg, badThingsGroup;
var branchImg,branchG;
var branchAni;
var trunkImg,trunkG;
var grenImg,grenG;
var infoG;


//Función para cargar imágenes y animaciones
function preload() {
leftPlayerImg = loadAnimation("imagenes/concha_kawai.png");
baseImg = loadImage("imagenes/base.png");
backImg1 = loadImage("imagenes/tunk2.png");
backImg2 = loadImage("imagenes/backtunk.png");
goodImg = loadImage("imagenes/willy.png");
badImg = loadImage("imagenes/rabbit.png");
branchImg = loadImage("imagenes/branch.png");
branchAni = loadImage("imagenes/branchAni.gif");
trunkImg = loadImage("imagenes/tunk.png");
grenImg = loadImage("imagenes/gren.png");
}
//Función para declarar Sprites y grupos
function setup() {
  createCanvas(590,590);
  back = createSprite(310,400,20,20);
  back.scale = 0.2;
  back.addImage(backImg1);
  
  player = createSprite(225,450,20,20);
  player.addAnimation("left",leftPlayerImg);
  player.scale = 0.1;
  baseGroup = new Group();
  goodThingsGroup = new Group();
  badThingsGroup = new Group();
  branchG = new Group();
  trunkG = new Group();
  grenG = new Group();
  infoG = new Group();
}
//Función para dibujar los Sprites y establecer reglas del juego
function draw() {
  background(300);
  drawSprites();
  
 
  
  //Puntuación 
  textSize(20);
  fill("#00104c")
  text("puntos"+points,12,35);
   
  
  
  
  //Inicio del juego
  if(gameState==="0" && keyDown("up_arrow")){
      gameState = "1";
    //Velocidad y cambio de estado 
    
     }
  
  if(gameState==="1"){ 
    back.addImage(backImg1);
    back.scale = 0.2;
    back.velocityX=0;
    back.velocityY=1;
    
     back.x = 310;
   
    if(back.y>425){
      back.y = 310;
    }
  createBases1();
  
    
  info()
    
  
    
     player.velocityY = player.velocityY +0.5;
     
    if(keyDown("right_arrow")){
    player.x=player.x+3;
    }
    if(keyDown("left_arrow")){
    player.x=player.x-3;
    }
    if(keyDown("up_arrow")){
    player.velocityY=-4;
    }
   
    if(player.isTouching(baseGroup)){
      player.velocityY = 0;
    }
    
    if(player.isTouching(goodThingsGroup,removeGoodThings)){
      points  = points +10;
    }
    
      createBadThings()
    
    if(player.isTouching(badThingsGroup)){
      gameState="3";
    }
   change()
   if(player.isTouching(branchG)){
     gameState="2";
   }
    
    if(player.isTouching(branchG,removebranch)){
      
    }

    if(player.isTouching(infoG,removeinfo)){
    
    }
  if(infoG.length>0 ){
    fill("white");
    textSize(30);
    text("As obtenido una pista",150,300);
    text.lifetime=300;
  }
    
  }
  
  
  
  if (gameState==="2"){
    back.addImage(backImg2);
    back.velocityX=-1;
    back.velcityY=0;
    back.scale = 1.4;
    
    if(back.y>425){
    }
      back.y = 250;
    if(back.x<100){
      back.x = 600;
    }
    
    createBases2();
    
   
   
     player.velocityY = player.velocityY +0.8;
     
    if(keyDown("right_arrow")){
    player.x=player.x+3;
    }
    if(keyDown("left_arrow")){
    player.x=player.x-3;
    }
    if(keyDown("up_arrow") && player.y>500){
    player.velocityY=-16;
    }
   
    if(player.isTouching(baseGroup)){
      player.velocityY = 0;
    }
    
    if(player.isTouching(goodThingsGroup,removeGoodThings)){
      points  = points +10;
    }
    
      createBadThings2()
    
    if(player.isTouching(badThingsGroup)){
      gameState="3";
    }
   trunk()
   if(player.isTouching(trunkG)){
     gameState="1";
   }
    
    
    if(player.isTouching(trunkG,removetrunk,removegren)){
      
    }
  
    gren()
    
    
     if(player.isTouching(infoG,removeinfo)){
    
    }
  if(infoG.length>2 ){
    fill("white");
    textSize(30);
    text("Parece que la segunda pista me lleva a los muelles ,parece que esos ruedores planean algo",150,300);
    text.lifetime=300;
  }
    
    
  }
  
  //Estado GAMEOVER 
  
  if(gameState==="3"){
    back.velocityY=0;
    player.velocityY=3;
    fill("rgb(255,248,0)");
    textSize(30);
    text("Game Over F",150,300);
     }
  

}

//Función para crear bases 
function createBases1(){
   if(frameCount % 100 === 0){
     var base = createSprite(random(50,450),0,70,20);
     base.velocityY = 2;
     base.addImage(baseImg);
     base.scale = 0.2;
     baseGroup.add(base);
     player.depth = base.depth;
     base.depth = base.depth + 1;
     var good = createSprite(base.x,base.y-15,20,20);
     good.velocityY = 2;
     good.addImage(goodImg);
     good.scale = 0.05;
     goodThingsGroup.add(good);
     
   }
}


function createBases2(){
   if(frameCount % 100 === 0){
     var base = createSprite(600,random(480,550),20,20);
     base.velocityY = 0;
     base.velocityX = -1;
     base.addImage(baseImg);
     base.scale = 0.2;
     baseGroup.add(base);
     player.depth = base.depth;
     base.depth = base.depth + 1;
     var good = createSprite(base.x,base.y,20,20);
     good.velocityY = 0;
     good.velocityX = -1;
     good.addImage(goodImg);
     good.scale = 0.05;
     goodThingsGroup.add(good);
     
   }
}

//Función para crear Cosas Malas 

function createBadThings(){
  var velo = 3;
  if(frameCount % 75 === 0){
  var bad = createSprite(random(50,450),0,70,20);
    velo = velo+3;
    bad.velocityY = velo;
    bad.addImage(badImg);
    bad.scale = 0.05;
    badThingsGroup.add(bad);
   
     
}
}


function createBadThings2(){
  var velo = -3;
  if(frameCount % 75 === 0){
  var bad = createSprite(600,random(470,550),70,20);
    velo = velo-3;
    bad.velocityY=0;
    bad.velocityX = velo;
    bad.addImage(badImg);
    bad.scale = 0.05;
    badThingsGroup.add(bad);
   
     
}
}

//Función para eliminar CosasBuenas
function removeGoodThings(sprite,goodThingsGroup ){
 goodThingsGroup.remove()
}

function change(){
  if(frameCount % 400 === 0){
  var changeSprite;
  changeSprite = createSprite(600,0,70,20);
  changeSprite.addImage(branchImg);
  changeSprite.velocityY = 3;
  changeSprite.scale = 2;
  branchG.add(changeSprite);
  }
}

function removebranch(sprite,branchG){
  branchG.remove()
}

function trunk(){
  if(frameCount % 300 === 0){
  var trunkSprite;
  trunkSprite = createSprite(600,300,20,20);
  trunkSprite.addImage(trunkImg);
  trunkSprite.velocityX = -3;
  trunkG.add(trunkSprite);
  }
}



function removetrunk(sprite,trunkG){
  trunkG.remove()
}

function gren(){
  var grenS = createSprite(300,560,20,20);
  grenS.addImage(grenImg);
  grenG.add(grenS);
  if(player.isTouching(grenS)){
    player.velocityY=-1;
  }
}

function removegren(sprite,grenG){
  grenG.remove()
}

function info(){
  if(frameCount % 600 ===0 && gameState==="1"){
    var info1
    info1 = createSprite(300,0,20,20)
    info1.velocityY = 1;
    infoG.add(info1);
  }
    if(frameCount % 600 ===0 && gameState==="2"){
    var info2;
    info2 = createSprite(300,0,20,20)
    info2.velocityY = 1;
    
    }
    

}

function removeinfo(sprite,infoG){
  infoG.remove()
}




