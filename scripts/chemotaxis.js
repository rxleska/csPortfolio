/*############################################################################################
###################################### CHEMOTAXIS-CELL-RESPONSE ##############################
##############################################################################################
### CHEMOTAXIS- the movement of a motile cell or organism, or part of one, in a direction  ###
### corresponding to a gradient of increasing or decreasing concentration of a particular  ###
### substance. In this porgram you  will see a bunch of dots representing cells react to a ###
### changing hue causing them to move in different ways. It reminds me of a an oil water   ###
### timer that creates a cool flow due to the oils hydrphilicness and desnsity......			 ###
##############################################################################################*/

var dots;
function setup() {
  colorMode(HSB);
  createCanvas(750, 500);
  dots = [];
  for(var i = 0; i < 2000; i++){
      dots.push(new Dot(random()*width, random()*height));
  }
}


function draw() {
  background(0);
  fill(255,0,255);
  dots.forEach(elem=> elem.drawDot());
  if(frameCount%2 == 0){
    dots.forEach(elem=> elem.move());
    //dots.forEach(elem=> elem.drawDot());
  }
  if(frameCount%5 == 0){
    dots.forEach(elem=> elem.colorCycle());
  }
  if(frameCount%(90*60) == 0){
    console.log("boyo");
  dots.forEach(elem=> elem.setVel(0,0));
  }
}

class Dot{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(10*random()-0.5,10*random()-0.5);
    this.acc = createVector(0,0);
    this.size = 7.5;
    this.col = color(random()*360,100,100);
  }
  move(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    
    if(this.pos.x > width-this.size || this.pos.x < this.size){
      this.vel.add(createVector(this.vel.x*-2, 0));
      //this.acc.add(createVector(this.acc.x*-2, 0));
    }
    if(this.pos.y > height-this.size || this.pos.y < this.size){
      this.vel.add(createVector(0,this.vel.y*-2));
      //this.acc.add(createVector(0,this.acc.y*-2));
    }
    
    this.vel = createVector(this.vel.x*0.99,this.vel.y*0.99);
    //orange/yellow
    if(hue(this.col) >= 20 && hue(this.col) < 80){
      this.acc = createVector(0.25,0.2);
    }
    //Green
    if(hue(this.col) >= 80 && hue(this.col) < 140){
      this.acc = createVector(0.05,0.05);
    }
    //blue/green
    if(hue(this.col) >= 140 && hue(this.col) < 200){
      this.acc = createVector(0.3,-0.05);
    }
    //blue
    if(hue(this.col) >= 200 && hue(this.col) < 260){
      this.acc = createVector(-0.3,0.15);
    }
    //purple
    if(hue(this.col) >= 260 && hue(this.col) < 320){
      
      if( this.pos.y < height/2){
        this.acc = createVector(random()-0.5,0.25);
      }
      else{
        this.acc = createVector(random()-0.5,-0.25);
      }
      
    }
    //red
    if((hue(this.col) >= 320 && hue(this.col) < 360)||(hue(this.col) >= 0 && hue(this.col) < 20)){
      this.acc = createVector(-0.5,-0.5);
    }
    
  }
  drawDot(){
    noStroke();
    fill(this.col);
    circle(this.pos.x, this.pos.y, this.size);
  }
  setVel(x,y){
    this.vel = createVector(x,y);
  }
  colorCycle(){
    this.col = color(hue(this.col)+1,100,100);
  }
  gravMouse(){
    this.vel = createVector((mouseX-this.pos.x)/30,(mouseY-this.pos.y)/30);
  }
}

function mousePressed(){
  dots.forEach(elem=> elem.gravMouse());
}

