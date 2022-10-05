var stage, snakehead, xyswitch, xyText, xyText2, xyRandLoc, score
 
function randLoc () {

  xyRandLoc = Math.floor((Math.random() * 500)) - 50;

  return xyRandLoc;
}

function xyswitchfunc () {
  xyswitch = Math.floor((Math.random() * 4) + 1);

  return xyswitch;
}

function init() {

  score = 0;

  stage = new createjs.Stage("gameCanvas");
  
  createjs.Ticker.on("tick", tick);
  //createjs.Ticker.setFPS(30);
  createjs.Ticker.framerate = 55;

  snakehead = new createjs.Shape();
  snakehead.graphics
    .beginFill("#000")
    .setStrokeStyle(1)
    .beginStroke("#000000")
    .drawRoundRect(0, 0, 40, 40, 40 / 10);
  snakehead.x = randLoc();
  snakehead.y = randLoc();
  stage.addChild(snakehead);

  xyswitchfunc();
  
  xyText = new createjs.Text("Clicked:", "bold 48px Arial", "#FFFFFF");
  xyText.textAlign = "left";
  xyText.textBaseline = "middle";
  xyText.x = 40;
  xyText.y = 40;
  stage.addChild(xyText);

  xyText2 = new createjs.Text(score, "bold 48px Arial", "#FFFFFF");
  xyText2.textAlign = "left";
  xyText2.textBaseline = "middle";
  xyText2.x = 240;
  xyText2.y = 40;
  stage.addChild(xyText2);

  snakehead.on("click",function(evt) {
    // currentTarget will be the container that the event listener was added to:
    score += 1;
    xyText2.text = score;
    evt.currentTarget.x = randLoc();
    evt.currentTarget.y = randLoc();
    xyswitchfunc();
    // make sure to redraw the stage to show the change:
    stage.update();
  });

}

function tick(event) {

  switch(xyswitch) {
    case 1:
      snakehead.x = snakehead.x + 5;
      break;
    case 2:
      snakehead.y = snakehead.y + 5;
      break;
    case 3:
      snakehead.x = snakehead.x - 5;
      break;
    case 4:
      snakehead.y = snakehead.y - 5;
      break;
    default:
      snakehead.x = snakehead.x + 5;
  }
  
  if (snakehead.x > stage.canvas.width || snakehead.x < 0 ||
    snakehead.y > stage.canvas.height || snakehead.y < 0) {
    snakehead.x = randLoc();
    snakehead.y = randLoc();
    xyswitchfunc();
  }
  
  stage.update(event); // important!!
}
