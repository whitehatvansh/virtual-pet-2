//Create variables here
var dog,happyDog,dogimg;
var database;
var FoodStock;
var FoodS;
var feed, addFood;
var fedTime,lastFed;
var foodObject;

function preload()
{
  //load images here
  dogimg = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(800, 700);
  
  database = firebase.database()

  dog = createSprite(400,350,100,100)
  dog.addImage(dogimg)
  dog.scale = 0.3

  FoodStock = database.ref('Food')
  FoodStock.on("value",readStock)

  foodObject = new Food()

  feed = createButton("Feed The Dog")
  feed.position(400,400)
  feed.mousePressed(feedDog);

  addFood = createButton("Add More Food")
  addFood.position(400,430)
  addFood.mousePressed(addFoods)
  
}


function draw() {  

  background(46,139,87)

 /* if(keyWentDown(UP_ARROW)){
    FoodS = FoodS - 1;
    writeStock(FoodS)
    dog.addImage(happyDog)

    
  }*/

  fedTime = database.ref('feedtime')
  fedTime.on("value",function(data){
    lastFed = data.val()
  })

  if(lastFed > 12){
    fill("black")
    text("last feed "+ lastFed%12 + "PM",400,100)
  }
  else if(lastFed == 0){
    fill("black")
    text("last feed: 12 AM",400,100)
  }
  else{
    fill("black")
    text("last feed "+lastFed,400,100)
  }
  

  foodObject.display();

  drawSprites();

  fill("black")
  textSize(12)
  text("Food Remaining = " + FoodS, 400,200)
  //add styles here

  

}
//function to read values from database

function readStock(data) {
  FoodS = data.val()
  foodObject.updateFoodStock(FoodS)
}

//function to write value in database

function writeStock(x) {
  database.ref('/').update({
    Food:x
  })
}

function addFoods(){
  FoodS++;
  database.ref('/').update({
    Food:FoodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObject.getFoodStock(),
    feedtime:hour()
  })
}
