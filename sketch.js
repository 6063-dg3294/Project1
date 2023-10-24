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
}


function setup() {
  createCanvas(windowWidth, windowHeight);
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

}

function drawOrna(){
  fill(255, random(255), random(255)); 
	beginShape();
	    for(let i=0; i<20; i++){
					
				curveVertex(random (0,width), random(0, height));
			}
	
	endShape(CLOSE);

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
  fill(cPurple);
  textFont(myFont);
  text("THE", width/2, height/3 - 110)
  text("MERLIN", width/2, height/3);
  text("TRILOGY", width/2, height/3 + 110);
}

function drawStone(){

}


function draw() {
  // Move the background dots down every second
  if (frameCount % 60 == 0) {
    jOffset += dotSpacing;
  }
  background(20);
  drawCover();
  drawFlower();
  drawTitle();
  drawOrna();

  drawSword();
  moveSword();
}

function drawSword() {
  // Blade
  fill("yellow");
  rect(swordX - 5, swordY, 20, 60);
  rect(swordX - 5, swordY - 20, 20, 60);
  rect(swordX - 5, swordY + 30, 20, 60);
  triangle(swordX - 30, swordY, swordX + 40, swordY, swordX + 5, swordY - 40);

  // Hilt
  fill(100);
  rect(swordX - 25, swordY + 60, 60, 10);
}

function moveSword() {
  if (swordY > 0) {
    swordY -= 2;
  } else {
    swordY = height - 60;
  }
}
