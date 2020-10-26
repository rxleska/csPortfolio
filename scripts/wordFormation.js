const alph = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`; //abcdefghijklmnopqrstuvwxyz
var letterCollection = [];
var letterOrgn;
let fontReg;
function preload(){
  fontReg = loadFont('../fonts/UbuntuMono-Regular.ttf');
}

function setup() {
  frameRate(60);
  letterOrgn = new Map();
  textSize(40);
  textFont(fontReg);
  createCanvas(500,500);
  background(92);
  for(var i = 0; i < 1000; i++){
    //console.log(alph[int(random(0,alph.length-1))]);
    let leta = alph[i%26];
    letterCollection.push(new Letter(leta));
    let j = i;
    if(!letterOrgn.has(leta)){
      //console.log("LOOP HAPPEND");
      letterOrgn.set(leta, [j,]);
    }
    else{
      let tempArr = letterOrgn.get(leta);
      letterOrgn.set(leta, tempArr.concat([j,]));
    }
  }
  console.log(letterOrgn);
}


function draw() {
  background(32);
  textSize(40);
  fill(50,200,50);
  for(var i = 0; i < 1000; i++){
    letterCollection[i].display();
    letterCollection[i].update();
  }
  switch((frameCount%720)/60){
    case 2:
      //moveLetter("A", 125, 250);
      //moveLetter("B", 150, 250);
      displayWord('  hello');
      break;
    case 3.5:
      removeWords();
      break;
    case 4:
      displayWord('this is an  example');
      break;
    case 5.5:
      removeWords();
      break;
    case 6:
      displayWord('of string   usage');
      break;
    case 7.5:
      removeWords();
      break;
    case 8:
      displayWord('  ignore  that these');
      break;
    case 9.5:
      removeWords();
      break;
    case 10:
      displayWord('are really   chars  ');
      break;
    case 11.5:
      removeWords();
      break;
     
  }
}

class Letter{
  constructor(le){
    this.character = le;
    this.posX = random(0,480);
    this.posY = random(0,480);
    this.moveX = 0;
    this.moveY = 0;
    this.col = color(random(64,224), random(64,224), random(64,224));
    this.inWord = false;
    this.cngCol = false;
  }
  display(){
    if(this.cngCol){
      fill(random(64,224), random(64,224), random(64,224));
    }
    else{
      fill(this.col);
    }
    text(this.character, this.posX, this.posY);
    this.posX = this.posX + this.moveX;
    this.posY = this.posY + this.moveY;
    //console.log(this.character);
  }
  getPosX(){
    return this.posX;
  }
  getPosY(){
    return this.posY;
  }
  getLeta(){
    return this.character;
  }
  getInWord(){
    return this.inWord;
  }
  update(){
    if(this.inWord){
      this.moveX = this.moveX /1.1;
      this.moveY = this.moveY /1.1;
    }
    else{
      if((this.posX > 100 && this.posX < 400) &&(this.posY > 200 && this.posY < 350)){
        this.moveX = random(0,500)/100 *(this.posX - 250 < 0? -1 : 1);
        this.moveY = random(0,800)/100 *(this.posY - 250 < 0? -1 : 1);
      }else{
        this.moveX = this.moveX/1.05;
        this.moveY = this.moveY/1.05;
      }
    }
  }
  setPos(x, y){
    this.inWord = true;
    this.moveX = x/11;
    this.moveY = y/11; //(infinte summation (10/((move divisor)^(n-1))))/10
  }
  cngColor(yn){
    this.cngCol = yn;
  }
  cngInWord(yn){
    this.inWord = yn;
  }
    
}



function moveLetter(letterChoice, x, y){
  //console.log(letterChoice);
  let letaNumArr = letterOrgn.get(letterChoice);
  let letaNum = 0;
  //for(let h = 0; h < letaNumArr.length; h++){
  //  console.log(letaNumArr[h]);
  //  //console.log(letterCollection[(letaNumArr[h])].getLeta());
  //  if(letterCollection[letaNumArr[h]].getInWord() == false){
  //    letaNum = letaNumArr[h];
  //    break;
  //  }
  //}
  let rndNum = 0;
  do{
    rndNum = letaNumArr[Math.floor(random(0,(letaNumArr.length-1)))];
  }while(letterCollection[rndNum].getInWord());
  letaNum = rndNum;
  
  letterCollection[letaNum].setPos(x- letterCollection[letaNum].getPosX(),y -letterCollection[letaNum].getPosY());
  letterCollection[letaNum].cngColor(false);
}

function displayWord(wordLow){
  let word = wordLow.toUpperCase();
  for(let g = 0;g < word.length; g++){
    if(alph.indexOf(word[g]) !== -1){
      moveLetter(word[g], ((g%10) * 25 + 130), (Math.floor(g/10) * 50 )+250);
    }
  }
}

function removeWords(){
  for(let f = 0; f < letterCollection.length; f++){
    letterCollection[f].cngInWord(false);
    letterCollection[f].cngColor(false);
  }
}