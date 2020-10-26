//#########
//##SETUP##
//#########
var people;
var circles;
function setup() {
  createCanvas(500, 500);
  fill(255, 0, 0);
  //people = new panicPerson[10];
  people = [];
  circles = [];
  for(let i = 0; i<20;i++){
    people.push(new PanicPerson(i/5*100.0, i%5 * 100.0));
  }
  for(let j = 0; j<20;j++){
    circles.push(new PanicCircle(j/5*100.0, j%5 * 100.0));
  }
}

//#########
//##DRAW###
//#########
function draw() {
  background(50,150,50);
  strokeWeight(10);
  fill(0);
  line(200,200,200,400-300);
  line(400,200,400,400-300);
  
  fill(255);
  arc(300, 500, 200, 200, 0, PI, OPEN);
  
  fill(255,0,0);
  noStroke();
  quad(438, 431-200, 486, 420-200, 469, 463-200, 430, 476-200);
  quad(162, 431-200, 114, 420-200, 131, 463-200, 170, 476-200);
  stroke(0);
  
  curve(100+150.0,100+50.0,200+150.0,75+50.0,300+150.0,50+50.0,400+150.0,75+50.0);
  curve(100.0,100+50.0,200.0,75+50.0,300.0,50+50.0,400.0,75+50.0);
  strokeWeight(3);
  
  beginShape();
  vertex(20+270, 20+400-100);
  vertex(40+270, 20+400-100);
  vertex(40+270, 40+400-100);
  vertex(60+270, 40+400-100);
  vertex(60+270, 60+400-100);
  vertex(20+270, 60+400-100);
  endShape(CLOSE);
  
  strokeWeight(1);
  
  for(let i = 0; i<people.length;i++){
    people[i].update();
    people[i].checkMove();
    circles[i].update();
    circles[i].checkMove();
  }
  if(frameCount%20 == 0){
    people.push(new PanicPerson(random(40,760), random(40,760)));
    circles.push(new PanicCircle(random(40,760),random(40,760)));
  }
  
  fill(240,50,50);
  rect(0,700-250,1000,1000);
  
  fill(0,0,255);
  textSize(42);
  text("ACSCompSciPandemic2020: Ryan Leska",5,743);
  
  fill(0);
  textSize(14);
  text("reseting in: " + Math.ceil(60- (frameCount/60)),700-300,756-280);
  
  if(frameCount%(60*60) == 0){
    frameCount = 0;
    setup();
  }
}
//####################
//START OF FIRST CLASS
//####################
class PanicPerson{
  constructor(xp, yp){
    this.posX = xp;
    this.posY = yp;
    this.moveX = random(0,200)/100;
    this.moveY = random(0,200)/100;
    this.col = color(random(0,255),random(0,255),random(0,255));
  }
  update(){
    //fill(random(0,255),random(0,255),random(0,255));
    fill(this.col);
    rect(this.posX,this.posY,14, 14);
    this.posX= this.posX + this.moveX;
    this.posY = this.posY + this.moveY;
    if(frameCount%60 == 0){
      this.moveX = random(-500,500)/100;
      this.moveY = random(-500,500)/100;
    }
  }
  get getX(){return this.posX;}
  get getY(){return this.posY;}
  checkMove(){
    if(this.posX <= 0){
      this.moveX = random(0,500)/100;
    }
    if(this.posX >= 780-300){
      this.moveX = random(-500,0)/100;
    }
    if(this.posY <= 0){
      this.moveY = random(0,500)/100;
    }
    if(this.posY >= 680-250){
      this.moveY = random(-500,0)/100;
    }
  }  
}

//####################
//START OF Second CLASS
//####################
class PanicCircle{
  constructor(xp, yp){
    this.posX = xp;
    this.posY = yp;
    this.moveX = random(0,200)/100;
    this.moveY = random(0,200)/100;
    this.col = color(random(0,255),random(0,255),random(0,255));
  }
  update(){
    //fill(random(0,255),random(0,255),random(0,255));
    fill(this.col);
    ellipse(this.posX,this.posY,20, 20);
    this.posX= this.posX + this.moveX;
    this.posY = this.posY + this.moveY;
    if(frameCount%60 == 0){
      this.moveX = random(-500,500)/100;
      this.moveY = random(-500,500)/100;
    }
  }
  get getX(){return this.posX;}
  get getY(){return this.posY;}
  checkMove(){
    if(this.posX <= 10){
      this.moveX = random(0,500)/100;
    }
    if(this.posX >= 790-300){
      this.moveX = random(-500,0)/100;
    }
    if(this.posY <= 10){
      this.moveY = random(0,500)/100;
    }
    if(this.posY >= 690-250){
      this.moveY = random(-500,0)/100;
    }
  }  
}
