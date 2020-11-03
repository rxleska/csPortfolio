let X;
let Y;
let Z;
let centerX;
let centerY;
let centerZ;
var cng;
var gravity;
var d1;

function setup() {
  createCanvas(500,500,WEBGL);
  X = 1000;
  Y = 1000;
  Z = 1000;
  centerX = 250;
  centerY = 250;
  centerZ = 250;
  gravity = -0.40;
  cng = 0;
  d1 = new Die();
}


function draw() {
  background(100);
  cng = cng - 0.01;
  noStroke();
  
  //red side x
  push();
  translate(-500,0,0);
  fill(255,0,0);
  box(1,1000,1000);
  pop();
  
  //green side y
  push();
  translate(0,-500,0);
  fill(0,255,0);
  box(1000,1,1000);
  pop();
  
  //blue side z
  push();
  translate(0,0,-500);
  fill(0,0,255);
  box(1000,1000,1);
  pop();
  
  //fill(50);
  //push();
  //translate(250,250,250);
  //rotateY(cng);
  //rotateX(0);
  //sphere(10,50,10);
  //pop();
  
  
  d1.display();
  d1.move();
  //if(frameCount%60 == 0){
  //  d1.debug();
  //}
  
  camera(X, Y, Z, centerX, centerY, centerZ, 1, 1, 0);
}

class Die {

  constructor(){
    this.xPos = 250;
    this.yPos = 250;
    this.zPos = 250;
    this.xVel = random()*10+5 * (random()-0.5*2);
    this.yVel = random()*10+5 * (random()-0.5*2);
    this.zVel = 0;
    this.xRot = radians(180);
    this.yRot = 0;
    this.zRot = radians(45);
    this.size = 50;
    this.xRotV = random()/10;
    this.yRotV = random()/10;
    this.zRotV = random()/10;
  }
  
  display(){
    fill(255);
    stroke(0);
    strokeWeight(5);
    push();
    translate(this.xPos,this.yPos,this.zPos);
    rotateZ(this.zRot);
    rotateX(this.xRot);
    rotateY(this.yRot);    
    box(this.size);
    this.drawDots(1);
    this.drawDots(2);
    this.drawDots(3);
    this.drawDots(4);
    this.drawDots(5);
    this.drawDots(6);
    pop();
  }
  move(){
    this.xPos+= this.xVel;
    this.yPos+= this.yVel;
    this.zPos+= this.zVel;
    this.zVel+= gravity;
    if(this.zPos < 0){
      this.zVel = this.zVel*-0.78;
      this.xRotV*=0.5;
    }
    if((abs(this.xRotV) > PI/1024)){
      this.xRot+= this.xRotV;
    }
    if((abs(this.yRotV) > PI/1024)){
      this.yRot+= this.yRotV;
    }
    if((abs(this.zRotV) > PI/1024)){
      this.zRot+= this.zRotV;
    }
    
    //xroll
    if(abs(this.zVel) < 1 && this.zPos < 20 && ((abs(this.xRot*57.2958)%90 >1) && (abs(this.xRot*57.2958)%90 < 89)) ){
      this.xRotV = ((((this.xRot*57.2958)%90)-45)/45+0.0001)*(PI/64); 
      //if((abs(this.xRot*57.2958)%180 > 10) && (abs(this.xRot*57.2958)%180 < 170)) {
      //  this.zRotV = ((((this.zRot*57.2958)%90)-45)/45+0.0001)*(PI/16); 
      //}
    }
    else if( ((abs(this.xRot*57.2958)%90 <1) || (abs(this.xRot*57.2958)%90 > 89)) && this.zPos < 10){
        this.xRotV = 0;
        this.xVel = 0;
    }
    
    //yroll
    if(abs(this.zVel) < 1 && this.zPos < 20 && ((abs(this.yRot*57.2958)%90 >1) && (abs(this.yRot*57.2958)%90 < 89)) ){
      this.yRotV = ((((this.yRot*57.2958)%90)-45)/45+0.0001)*(PI/64); 
      //if((abs(this.yRot*57.2958)%180 > 10) && (abs(this.yRot*57.2958)%180 < 170)) {
      //  this.zRotV = ((((this.zRot*57.2958)%90)-45)/45+0.0001)*(PI/16); 
      //}
    }
    else if( ((abs(this.yRot*57.2958)%90 <1) || (abs(this.yRot*57.2958)%90 > 89)) && this.zPos < 10){
        this.yRotV = 0;
        this.yVel = 0;
    }
    
    //zroll
    this.zRotV*=0.8;
    
    this.xVel*=0.99;
    this.yVel*=0.99;
    
    if(this.xPos > 500 || this.xPos < 0){
      this.xVel*=-0.95;
    }
    if(this.yPos > 500 || this.yPos < 0){
      this.yVel*=-0.95;
    }
  }
  
  debug(){
    console.log("x:" + (this.xRot*57.2958) + "y:" + (this.yRot*57.2958) + "z:" + (this.zRot*57.2958));
  }
  
  drawDots(n){
    switch(n){
      case 1:
        push();
        fill(0);
        translate(this.size/2,0,0);
        sphere(this.size/12);
        pop();
      break;
      case 2:
        push();
        fill(0);
        translate(this.size/4,this.size/-2,this.size/4);
        sphere(this.size/12);
        pop();
        push();
        fill(0);
        translate(this.size/-4,this.size/-2,this.size/-4);
        sphere(this.size/12);
        pop();
      break;
      case 3:
        push();
        fill(0);
        translate(this.size/4,this.size/4,this.size/2);
        sphere(this.size/12);
        pop();
        push();
        fill(0);
        translate(this.size/-4,this.size/-4,this.size/2);
        sphere(this.size/12);
        pop();
        push();
        fill(0);
        translate(0,0,this.size/2);
        sphere(this.size/12);
        pop();
      break;
      case 4:
        push();
        fill(0);
        translate(this.size/4,this.size/4,this.size/-2);
        sphere(this.size/12);
        pop();
        push();
        fill(0);
        translate(this.size/-4,this.size/4,this.size/-2);
        sphere(this.size/12);
        pop();
        push();
        fill(0);
        translate(this.size/4,this.size/-4,this.size/-2);
        sphere(this.size/12);
        pop();
        push();
        fill(0);
        translate(this.size/-4,this.size/-4,this.size/-2);
        sphere(this.size/12);
        pop();
      break;
      case 5:
        push();
        fill(0);
        translate(0,this.size/2,0);
        sphere(this.size/12);
        pop();
        push();
        fill(0);
        translate(this.size/4,this.size/2,this.size/4);
        sphere(this.size/12);
        pop();
        push();
        fill(0);
        translate(this.size/-4,this.size/2,this.size/4);
        sphere(this.size/12);
        pop();
        push();
        fill(0);
        translate(this.size/4,this.size/2,this.size/-4);
        sphere(this.size/12);
        pop();
        push();
        fill(0);
        translate(this.size/-4,this.size/2,this.size/-4);
        sphere(this.size/12);
        pop();
      break;
      case 6:
      push();
        fill(0);
        translate(this.size/-2,this.size/4,this.size/4);
        sphere(this.size/12);
        pop();
      push();
        fill(0);
        translate(this.size/-2,0,this.size/4);
        sphere(this.size/12);
        pop();
      push();
        fill(0);
        translate(this.size/-2,this.size/-4,this.size/4);
        sphere(this.size/12);
        pop();
      push();
        fill(0);
        translate(this.size/-2,this.size/4,this.size/-4);
        sphere(this.size/12);
        pop();
      push();
        fill(0);
        translate(this.size/-2,0,this.size/-4);
        sphere(this.size/12);
        pop();
      push();
        fill(0);
        translate(this.size/-2,this.size/-4,this.size/-4);
        sphere(this.size/12);
        pop();
      break;
    }
  }
}

function mousePressed(){
  setup();
}