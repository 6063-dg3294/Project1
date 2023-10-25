let swordX;
let swordY;
let colorMix = []; 
let cBlue = [72, 124, 247];
let cRed = [235, 75, 84];
let cYellow = [253, 238, 115];
let cPurple = [68, 43, 193];
let cBluePurple = [24, 32, 184];
let dotSpacing = 4;

let iOffset = 0;
let jOffset = 0;



let myFont;
function preload() {
  myFont = loadFont('NeueMontreal-Bold.otf');
  mCamera = loadImage("./2.png")
  mCameraB = loadImage("./3.png")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  mCamera.resize(0, 500);
  mCameraB.resize(0, 500)
  mCamera.loadPixels();
  mCameraB.loadPixels();

  swordX = width / 2;
  swordY = height;

  colorMix[0] = cBlue;
  colorMix[1] = cRed;
  colorMix[2] = cYellow;
  colorMix[3] = cPurple;
  colorMix[4] = cBluePurple;
}

function drawCover(){
  let bookHeight = screen.height;
  let bookWidth = bookHeight/9.6 * 6.4;
  fill("pink")
  rect(width/2 - bookWidth/2, 0, bookWidth, bookHeight);
  print(bookWidth)

}

let rOrna = 100; 
let maxROrna = 400; 
let growing = true; 

function drawOrna() {
  if (growing) {
    rOrna += 4; 
    if (rOrna >= maxROrna) {
      growing = false; 
    }
  } else {
    rOrna -= 4; 
    if (rOrna <= 100) {
      growing = true; 
    }
  }
  fill(255, random(255), random(255));
  ellipse(width / 2, height, rOrna);
}

function drawFlower() {
  // Draw flower in dots
  noStroke()
  for (let i = iOffset; i < width; i += dotSpacing*1.1){
    for (let j = jOffset; j < height; j += dotSpacing*1.1){
      let y = random(-5, 5);
      fill(random(colorMix));
      ellipse(i + y, j + y, 1.5, 1.5)
      // rect(i + y, j + y, 3, 3)
    }
  }
}

function drawTitle(){
  textAlign(CENTER);
  textSize(120);
  fill(cRed);
  textFont(myFont);
  text("THE", width/2 + 4, height/3 - 110 + 4)
  text("MERLIN", width/2 + 4, height/3 + 4);
  text("TRILOGY", width/2 + 4, height/3 + 110 + 4);
  fill(cPurple);
  text("THE", width/2, height/3 - 110)
  text("MERLIN", width/2, height/3);
  text("TRILOGY", width/2, height/3 + 110);

  textSize(20)
  text("MARY STEWART", width/2, height - 100)
}

function drawStone(){

}





let cameraXOffset = -10; 
let cameraYOffset = 370;
// let cameraX2Offset = screen.width/2 - 550 + screen.height/9.6 * 6.4; 
// let cameraY2Offset = 220;
let cameraX2Offset = screen.width/2 - 370+ screen.height/9.6 * 6.4; 
let cameraY2Offset = 370;

function draw() {
  // Move the background dots down every second
  if (frameCount % 60 == 0) {
    jOffset += dotSpacing;
  }
  background(20);
  mCamera.loadPixels();
  image(mCamera, cameraXOffset, cameraYOffset);
  image(mCameraB, cameraX2Offset, cameraY2Offset)

  drawFlower();
  stars.forEach(star => {
    star.display();
    star.update();
  });

  drawCover();  
  drawOrna();
  drawTitle();


  drawSword();
  moveSword();
}

function drawSword() {
  // Blade
  fill("gray");
  beginShape();
  let ratio = 1.5; // Adjust this value to change the size of the sword
  let hiltWidth = 40 * ratio;
  let hiltHeight = 10 * ratio;
  let bladeTopX = swordX + 10 * ratio;
  let bladeTopY = swordY - 60 * ratio;
  let bladeMiddleX = swordX;
  let bladeMiddleY = swordY - 120 * ratio;
  let bladeBottomX = swordX - 10 * ratio;
  let bladeBottomY = swordY - 60 * ratio;

  vertex(swordX - 5 * ratio, swordY);
  vertex(swordX + 5 * ratio, swordY);
  vertex(bladeTopX, bladeTopY);
  vertex(bladeMiddleX, bladeMiddleY);
  vertex(bladeBottomX, bladeBottomY);
  endShape(CLOSE);

  // Hilt
  fill(100);
  rect(swordX - hiltWidth / 2, swordY, hiltWidth, hiltHeight);
  rect(swordX - 7.5 * ratio, swordY, 15 * ratio, 45 * ratio);
}

function moveSword() {
  let ratio = 1.5; 
  if (swordY > -120 * ratio) {
    swordY -= 2 * ratio;
  } else {
    swordY = height;
  }
}

let stars = [];
function mouseClicked() {
  stars.push(new Star(mouseX, mouseY, 100, random(50, 255), 60, 2));
}

class Star {
  constructor(x, y, radius, alpha, lifeSpan, fadeSpeed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.alpha = alpha;
    this.lifeSpan = lifeSpan;
    this.fadeSpeed = fadeSpeed;
  }

  display() {
    fill(random(255), this.alpha);
    noStroke();
    this.drawStar(this.x, this.y, this.radius/2, this.radius / 10, 4);
  }
  update() {
    this.lifeSpan--;
    this.alpha = this.lifeSpan * this.fadeSpeed;
    if (this.lifeSpan <= 0) {
      stars.shift();
    }
  }

  drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = -PI / 4; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }


}
