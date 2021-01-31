var play;
var End;
var gameState =0;
var backgroundColor ="black";
var playImg;
var backgroundCastle 
var player,playerImg;
var ground,invisibleGround;
var enemyGroup;
var friendsImg;
var FriendsGroup;

var player_change;

var ObstaclesGroup;
var edges;

var fr_index =0;

var button

var FriendsTeam =[];

function preload()
{
  playImg =loadImage("play.png")
  friendsImg =loadImage("among.png")
  backgroundCastle =loadImage("castle.png");
  playerImg =loadImage("newplayer.png");
  player_change = loadImage("player1.png");
  
}

function setup() {
  createCanvas(1600,400);

  play =createSprite(width/2,height/2,60,20);
  play.addImage(playImg);
  play.visible =false;

  player =createSprite(200,360,20,50);
  player.addImage(playerImg)

  player.setCollider("circle",0,0,100);
 
  player.scale = 0.5;
  player.x = 50;

  ground = createSprite(200,360,2800,20);
  ground.visible =false;


  invisibleGround =createSprite(800,390,1600,20)
  invisibleGround.visible =true;

  button =createSprite(500,200,50,50);
  button.visible =false;

  edges =createEdgeSprites();

  ObstaclesGroup = createGroup();
  FriendsGroup = createGroup();

}
function draw() {
  background(backgroundColor);  

  if(gameState === 0)
  {
    play.visible =true;
    
    if(mousePressedOver(play))
    {
      gameState = 1;

    }
  }

  if(gameState === 1)
  {
    play.visible =false;
    backgroundColor =backgroundCastle;
    spawnFriends();
    
    if(keyDown(RIGHT_ARROW))
    {
      player.x =player.x +5;
    }

   
  if(player.isTouching(FriendsGroup))
  {
    for(var i =0; i < FriendsGroup.length; i++)
    {
        if(FriendsGroup.get(i).isTouching(player))
        {
          FriendsGroup.get(i).addImage(player_change);
          FriendsGroup.get(i).scale = 0.6; 
          FriendsTeam[fr_index]=i;       
          fr_index +=1;       
          if(FriendsGroup.isTouching(ObstaclesGroup))
          {
            for(var i =0; i <FriendsGroup.length; i++)
            {
              if(FriendsGroup.get(i).isTouching(ObstaclesGroup))
              {
                FriendsGroup.get(i).destory();
              }
            }
          }
        }
      }
  }

    spwanObstacles();
    if(keyDown(LEFT_ARROW))
    {
      player.x =player.x -5;
    }
    

    if(keyDown(UP_ARROW) && player.y >= 300)
    {
      player.velocityY =-10;
    }

    player.velocityY +=0.5;

  }

  if(player.isTouching(ObstaclesGroup))
 {
   gameState =End;
 }
 else if(gameState === End)
 {
  player.velocityY = 0;

  ObstaclesGroup.setVelocityXEach(0);
  ObstaclesGroup.setLifetimeEach(-1);

  button.visible =true;
  if(mousePressedOver(button))
  {
    reset();
  }
 }

   player.collide(edges[0]);
   player.collide(edges[1]);
 // invisibleGround.display();
  player.collide(invisibleGround);


  if(fr_index !== null)
  {
    for(var i =0; i<FriendsTeam.length; i++)
    {
   /* FriendsGroup.get(FriendsTeam[i]).x =player.x -50;
    FriendsGroup.get(FriendsTeam[i]).y =player.y ;*/
    
    }
  }

/* if(player.isTouching(ObstaclesGroup))
 {
   for(var i =0; i < ObstaclesGroup.length; i++)
   {
     if(ObstaclesGroup.get(i).isTouching(player))
     {
       ObstaclesGroup.get(i).destory();
     }
   }
 }*/

  drawSprites();

}

function spwanObstacles()
{
  if(frameCount%200 === 0)
  {
  var obstacle =createSprite(1600,random(300,380),30,30);
  obstacle.velocityX =random(-4,-9);
  obstacle.lifetime =400;

  player.depth =obstacle.depth;
  obstacle.depth +=1;

  ObstaclesGroup.add(obstacle);
  }
}

function spawnFriends()
{
  if(frameCount%400 === 0)
  {
      
    var friends =createSprite(random(700,1600),360,30,30);
    friends.addImage(friendsImg);
    friends.setCollider("rectangle",0,0,200,200);
  

    friends.scale =0.10;

    friends.depth = player.depth;
    FriendsGroup.add(friends);
  
  }
}

function reset()
{
  gameState =1;

  button.visible =false;

  player.x =100;

  ObstaclesGroup.destroyEach();
  FriendsGroup.destroyEach();
}