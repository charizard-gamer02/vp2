//Create variables here
var dog,beggdog,jumpdog,database,foodS,foodStock;
var feed,addFood
var fedTime,lastFed
var foodobj
function preload()
{
  //load images here
  beggdog=loadImage("Dog.png");
  jumpdog=loadImage("happydog.png");
}

function setup() {
	createCanvas(500,500);
  dog=createSprite(250,250,20,20);
  dog.addImage("LOL",beggdog);
  dog.scale=0.5
  database = firebase.database();
  
  feed=createButton('FEED')
  feed.position(400,100)
  feed.mousePressed(feedDog)
  addFood=createButton('ADD FOOD')
  addFood.position(600,100)
  addFood.mousePressed(addFoods)
  foodStock=database.ref('food');
  foodStock.on("value",function(data){
    foodS = data.val();
  })
  foodObj = new Food(foodS,lastFed)
}


function feedDog(){ 
  dog.addImage("dog",jumpdog); 
  foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
  database.ref('/').update({ 
    Food:foodObj.getFoodStock(),
    hour:hour()
  })
} 

function addFoods(){ 
  foodS++; 
  database.ref('/').update({ 
    Food:foodS 
  }) 
} 


function draw() {  
  background(46,139,87);
  
  fedTime = database.ref('hour');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill("black");
  textSize(30);
 
  text("Food Available:" + foodS,200,500);
  drawSprites();
  //add styles here
  
  foodObj.display();
  fill(255,255,254); 
  textSize(15); 
  if(lastFed>=12){ 
    text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
  }else if(lastFed==0){ 
    text("Last Feed : 12 AM",350,30); 
  }else{ 
    text("Last Feed : "+ lastFed + " AM", 350,30); 
  } 
  
}