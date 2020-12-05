class Food {
    constructor(){
        this.foodstock = 0
        this.lastFed

        this.image = loadImage("images/Milk.png")
    }

    getFoodStock() {
        return this.foodstock
    }

    updateFoodStock(foodstock) {
        this.foodstock = foodstock
        console.log(foodstock)
    }

    deductFood() {
        this.foodstock = this.foodstock - 1;
    }

    display(){
        var x = 80;
    var y = 100;
    
    for(var i = 0;i < this.foodstock;i++){
    if(i%10 === 0){
        x = 80;
        y = y + 50
    }
    image(this.image,x,y,50,50)
    x = x + 30
     
    }
    
  }
}