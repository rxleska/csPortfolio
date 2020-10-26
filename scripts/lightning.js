var cfls;
function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(20);
  cfls = [];
  //cfl1 = new CFL(width/10*4,height/20*6,10);
  //cfl2 = new CFL(width/10*5,height/20*7,10);
  for(let e = 0; e < 5; e++){
    cfls.push(new CFL(width/10*(4+e),height/20*(6+e),10));
  }
}


function draw() {
  background(22);
  fill(255,0,0);
  noStroke();
  text('Tesla Coil Simulator', 5,10);
  drawTeslaCoil();
  fill(60);
  rect(width/10*(4),height/20*(6),width/50, -height);
  rect(width/10*(8.5),height/20*(10.5),width/50, -height);
  fill(40);
  stroke(0);
  strokeWeight(3);
  quad(width/10*(3),height/20*(5.5),width/10*(5),height/20*(5.5), width/10*(9.8),height/20*(10.5) ,width/10*(7.66), height/20*(10.5));
  strokeWeight(1);
  for(let e = 0; e < 3; e++){
    // (random()*4 >2 ? random()*width/6 : (random()*width/2 + width/3))
    drawLightningWD((int)(random()*4>2 ? random()*width/6 : (random()*width/2 + width/2)), random()*(height-height/5), (int) (random()*100));
  }
  cfls.forEach(cfl => cfl.drawBulb());
  cfls.forEach(cfl => cfl.changeLux(0));
  //if(frameCount%10 == 0 ||frameCount%10 == 1 ||frameCount%10 == 2){
  //  drawLightning(random()*width, random()*height-height/4);
  //  drawLightning(random()*width, random()*height-height/4);
  //}
}

function drawTeslaCoil(){
  noStroke();
  fill(128);
  rect(width/3, height, (width/20), height/-5);
  fill(222);
  circle(width/3, height-height/5, width/15);
  circle(width/3 + (width/20), height-height/5, width/15);
  rect(width/3, height-(height/5 +width/30), (width/20), (width/15));
}

function drawLightning(posX, posY){
  fill(255);
  stroke(255);
  let dpx = posX;
  let dpy = posY;
  let x = width/3 + (width/40);
  let y = height-height/5;
  let desSlope = (dpy-y)/(dpx-x);
  //console.log(desSlope);
  let xm = (dpx-x)/1000;
  let ym = (dpy-y)/1000;
  let aboveMod = posY < height-height/5 ? -1 : 1;
  let besideMod = posX < width/3 + (width/40)? -1 : 1;
  for(let a = 0; a<300; a++){
    if(a%50 == 0 && a!=0){
     drawLightningBranch(x,y,dpx+(random()*20-10),dpy+(random()*20-10)); 
    }
    line(x,y,x+xm, y+ym);
    x = x + xm;
    y = y + ym;
    let strnth = random()*5;
    ym = desSlope*strnth*(random()*1.8-0.2)*besideMod;
    xm = strnth*(random()*1.8-0.2)*besideMod;
    //console.log(xm + ":" + ym);
    //if(((mouseX > width/3 + (width/40))? x>dpx: x<dpx)|| ((mouseY > width/3 + (width/40))? y>dpy: y<dpy)){
    //  break;
    //}
    let lightAngle = Math.tan(desSlope);
    //console.log((cfl1.getAngle()-lightAngle));
    cfls.forEach(cfl => cfl.checkLine(dpx,dpy,desSlope,height-height/5));
    //cfl1.checkLine(dpx,dpy,desSlope,height-height/5);
    //cfl2.checkLine(dpx,dpy,desSlope,height-height/5);
  }
}

function drawLightningBranch(stpX, stpY, posX, posY){
  fill(255);
  stroke(255);
  let aboveMod = posY < height-height/5 ? -1 : 1;
  let besideMod = posX < width/3 + (width/40)? -1 : 1;
  let dpx = posX+(posX < width/3 + (width/40)? -20*posY : 20*posY);
  let dpy = posY+(posY < height-height/5 ? -20*posY : 20*posY);
  let x = stpX;
  let y = stpY;
  let desSlope = (dpy-y)/(dpx-x);
  //console.log(desSlope);
  let xm = (dpx-x)/1000;
  let ym = (dpy-y)/1000;
  
  for(let a = 0; a<30; a++){
    
    line(x,y,x+xm, y+ym);
    x = x + xm;
    y = y + ym;
    let strnth = random()*5;
    ym = desSlope*strnth*(random()*1.8-0.2)*besideMod;
    xm = strnth*(random()*1.8-0.2)*besideMod;
    //console.log(xm + ":" + ym);
    //if(((mouseX > width/3 + (width/40))? x>dpx: x<dpx)|| ((mouseY > width/3 + (width/40))? y>dpy: y<dpy)){
    //  break;
    //}
  }
  
}

function drawLightningWD(posX, posY, dist){
  fill(255);
  stroke(255);
  let dpx = posX;
  let dpy = posY;
  let x = width/3 + (width/40);
  let y = height-height/5;
  let desSlope = (dpy-y)/(dpx-x);
  //console.log(desSlope);
  let xm = (dpx-x)/1000;
  let ym = (dpy-y)/1000;
  let aboveMod = posY < height-height/5 ? -1 : 1;
  let besideMod = posX < width/3 + (width/40)? -1 : 1;
  for(let a = 0; a<dist; a++){
    if(a%50 == 0 && a!=0){
     drawLightningBranch(x,y,dpx+(random()*20-10),dpy+(random()*20-10)); 
    }
    line(x,y,x+xm, y+ym);
    x = x + xm;
    y = y + ym;
    let strnth = random()*5;
    ym = desSlope*strnth*(random()*1.8-0.2)*besideMod;
    xm = strnth*(random()*1.8-0.2)*besideMod;
    //console.log(xm + ":" + ym);
    //if(((mouseX > width/3 + (width/40))? x>dpx: x<dpx)|| ((mouseY > width/3 + (width/40))? y>dpy: y<dpy)){
    //  break;
    //}
    let lightAngle = Math.tan(desSlope);
    //console.log((cfl1.getAngle()-lightAngle));
    if(dist > 80){
      cfls.forEach(cfl => cfl.checkLine(dpx,dpy,desSlope,height-height/5));
    }
  }
}

class CFL {
  constructor(posX, posY, size){
    this.x = posX;
    this.y = posY;
    this.s = size;
    this.lux = 0;
  }
  drawBulb(){
    noStroke();
    fill(150+this.lux); // (random()*50)
    rect(this.x,this.y,(width/10),this.s);
    fill(164,169,172);
    stroke(0);
    rect(this.x,this.y-3, width/100,this.s+6);
    rect(this.x+width/10,this.y-3, width/100,this.s+6);
    //console.log(this.lux);
  }
  changeLux(l){
    this.lux = l;
  }
  checkLine(lx, ly, slope, vp){
    //if(frameCount%20 ==0){console.log(vp +":"+ ly)}
    if(vp > ly){
      let nx = (this.y-ly)/slope + lx;
      if((nx-this.x) >0 && (nx-this.x)<(width/10)){
        this.changeLux(random()*50+50);
      }
      else if(nx-this.x > -20 && nx-this.x < width/10+20){
        this.changeLux(Math.abs(nx-(this.x+(width/20)))-50);
      }
      //else{
      //  this.changeLux(0);
      //}  
    }
    
    
  }
}

function mouseDragged(){
   drawLightning(mouseX,mouseY);
}
