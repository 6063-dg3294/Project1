let swordX;
let swordY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0)
  swordX = width / 2;
  swordY = height;
  drawFlowers();
}

function draw() {
  // text("The Merlin Trilogy ", x, y, x2, y2)
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
    swordY = height;
  }

}

function drawFlowers() {
  for (let i = 0; i < width; i += 10) {
    for (let j = 0; j < height; j += 10) {
      drawFlower(i, j);
    }
  }
}

function drawFlower(x, y) {
  // Draw flower indots
  noStroke();
  fill("pink");
  ellipse(random(width), random(height), 2, 2);

  fill("purple");
  ellipse(random(width), random(height), 2, 2);

  fill("yellow");
  ellipse(random(width), random(height), 2, 2);

  fill("green");
  ellipse(random(width), random(height), 2, 2);
}