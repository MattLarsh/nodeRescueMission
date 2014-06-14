(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var svgNS = "http://www.w3.org/2000/svg";

function goodShot() {
  var newText = document.createElementNS(svgNS,"text");
  newText.setAttributeNS(null,"x",400);    
  newText.setAttributeNS(null,"y",265);  
  newText.setAttributeNS(null,"font-size","45px");
  newText.setAttributeNS(null,"text-anchor","middle");
  newText.setAttributeNS(null,"fill-opacity",0.5); 
  newText.setAttributeNS(null,"font-family",'hotel-open');
  newText.setAttributeNS(null,"id",'good');
  newText.setAttributeNS(null,"fill",'#01FF02');
  var textNode = document.createTextNode("Good Shot!");
  newText.appendChild(textNode);
  document.getElementById("field").appendChild(newText);
}
function savedPrincess() {
  var newText = document.createElementNS(svgNS,"text");
  newText.setAttributeNS(null,"x",400);    
  newText.setAttributeNS(null,"y",265);  
  newText.setAttributeNS(null,"font-size","45px");
  newText.setAttributeNS(null,"text-anchor","middle");
  newText.setAttributeNS(null,"fill-opacity",0.5); 
  newText.setAttributeNS(null,"font-family",'hotel-open');
  newText.setAttributeNS(null,"id",'good');
  newText.setAttributeNS(null,"fill",'#01FF02');
  var textNode = document.createTextNode("You saved the Princess!");
  newText.appendChild(textNode);
  document.getElementById("field").appendChild(newText);
}
function removeElement() {
  document.getElementById("good").remove();
}
function expired() {
  var newText = document.createElementNS(svgNS,"text");
  newText.setAttributeNS(null,"x",400);    
  newText.setAttributeNS(null,"y",235);  
  newText.setAttributeNS(null,"font-size","25px");
  newText.setAttributeNS(null,"text-anchor","middle");
  newText.setAttributeNS(null,"fill-opacity", 1); 
  newText.setAttributeNS(null,"font-family",'hotel-open');
  newText.setAttributeNS(null,"fill",'red');
  var textNode = document.createTextNode("The Princess Has Been Fatally Injured!");
  newText.appendChild(textNode);
  document.getElementById("field").appendChild(newText);
}
function tryAgain(message){
  var newRect = document.createElementNS(svgNS,"rect");
  newRect.setAttributeNS(null,"width", 150); 
  newRect.setAttributeNS(null,"height",45);    
  newRect.setAttributeNS(null,"x",330);   
  newRect.setAttributeNS(null,"y",280);  
  newRect.setAttributeNS(null,"rx",10);
  newRect.setAttributeNS(null,"fill-opacity",1);    
  newRect.setAttributeNS(null,"fill","#267B93");
  document.getElementById("field").appendChild(newRect);
  var newText = document.createElementNS(svgNS,"text");
  newText.setAttributeNS(null,"x",405);    
  newText.setAttributeNS(null,"y",310);  
  newText.setAttributeNS(null,"font-size","16px");
  newText.setAttributeNS(null,"text-anchor","middle");
  newText.setAttributeNS(null,"fill-opacity", 1); 
  newText.setAttributeNS(null,"font-family",'hotel-open');
  newText.setAttributeNS(null,"fill",'white');
  var textNode = document.createTextNode(message);
  newText.appendChild(textNode);
  document.getElementById("field").appendChild(newText);

  var restartGame = document.createElementNS(svgNS,"rect");
  restartGame.setAttributeNS(null,"width", 150); 
  restartGame.setAttributeNS(null,"height",45);    
  restartGame.setAttributeNS(null,"x",330);   
  restartGame.setAttributeNS(null,"y",280);  
  restartGame.setAttributeNS(null,"rx",10);
  restartGame.setAttributeNS(null,"fill-opacity",0);    
  restartGame.onclick = function(){
    window.location.reload();
  };
  document.getElementById("field").appendChild(restartGame);
}






var begin = function(){
  game();
};
function game(){
  var boxWidth = field.viewBox.baseVal.width;
  var boxHeight = field.viewBox.baseVal.height;
  var princess = {};
  var smallBad = {};
  var mediumBad = {};
  var bigBad = {};
  var ball = function(id){
    var e = document.getElementById(id);
    var r = {};
    r.dx = 0;
    r.dy = 0;
    function update(){
    	r.right = r.cx + r.r;
    	r.left = r.cx - r.r;
    	r.top = r.cy - r.r;
    	r.bottom = r.cy + r.r;
    }
    Object.defineProperty(r, 'cx', {
      get: function(){return e.cx.baseVal.value},
      set: function(val){e.cx.baseVal.value = val; update();}
    });
    Object.defineProperty(r, 'cy', {
      get: function(){return e.cy.baseVal.value},
      set: function(val){e.cy.baseVal.value = val; update();}
    });
    Object.defineProperty(r, 'r', {
      get: function(){return e.r.baseVal.value},
      set: function(val){e.r.baseVal.value = val; update();}
    });

    update();

    return r;
  };

  var elipse = function(id){
    var e = document.getElementById(id);
    var r = {};
    r.dx = 0;
    r.dy = 0;
    function update(){
      r.right = r.cx + r.r;
      r.left = r.cx - r.r;
      r.top = r.cy - r.r;
      r.bottom = r.cy + r.r;
    }
    Object.defineProperty(r, 'cx', {
      get: function(){return e.cx.baseVal.value},
      set: function(val){e.cx.baseVal.value = val; update();}
    });
    Object.defineProperty(r, 'cy', {
      get: function(){return e.cy.baseVal.value},
      set: function(val){e.cy.baseVal.value = val; update();}
    });

    update();

    return r;
  };

  var tilted = function(id){
    var e = document.getElementById(id);
    var r = {};
    r.dx = 0;
    r.dy = 0;
    Object.defineProperty(r, 'cx', {
      get: function(){return e.transform.baseVal[0].matrix.e},
      set: function(val){e.transform.baseVal[0].matrix.e = val;}
    });
    return r;
  };

  var rectangle = function(id){
    var e = document.getElementById(id);
    var r = {};
    r.dx = 0;
    r.dy = 0;
    Object.defineProperty(r, 'cx', {
      get: function(){return e.x.baseVal.value},
      set: function(val){e.x.baseVal.value = val;}
    });
    return r;
  };
  var line = function(id){
    var e = document.getElementById(id);
    var r = {};
    r.dx1 = 0;
    r.dx2 = 0;
    Object.defineProperty(r, 'x1', {
      get: function(){return e.x1.baseVal.value},
      set: function(val){e.x1.baseVal.value = val;}
    });
    Object.defineProperty(r, 'x2', {
      get: function(){return e.x2.baseVal.value},
      set: function(val){e.x2.baseVal.value = val;}
    });
    return r;
  };
  var surfBoard = rectangle('surfBoard');
  var torso1 = rectangle('torso1');
  var torso2 = rectangle('torso2');
  var leftMouth = tilted('leftMouth');
  var rightMouth = tilted('rightMouth');
  var leftHair = tilted('leftHair');
  var rightHair = tilted('rightHair');
  var ball1 = ball('ball1');
  var ball2 = ball('ball2');
  var ball3 = ball('ball3');
  var ball4 = ball('ball4');
  var ball5 = ball('ball5');
  var ball6 = ball('ball6');
  var myball = document.getElementById('ball1');

  var trigger1 = document.getElementById('trigger1');
  trigger1.onclick = function(){
    startBall1();
  };
  var trigger2 = document.getElementById('trigger2');
  trigger2.onclick = function(){
    startBall2();
  };
  var trigger3 = document.getElementById('trigger3');
  trigger3.onclick = function(){
    startBall3();
  };
  var trigger4 = document.getElementById('trigger4');
  trigger4.onclick = function(){
    startBall4();
  };
  var trigger5 = document.getElementById('trigger5');
  trigger5.onclick = function(){
    startBall5();
  };
  var trigger6 = document.getElementById('trigger6');
  trigger6.onclick = function(){
    startBall6();
  };
  function removeStartButton(){
    document.getElementById('startRect').remove();
    document.getElementById('startText').remove();
    document.getElementById('startGame').remove();
  }
  removeStartButton();
  var face = ball('face');
  var leftEye = elipse('leftEye');
  var rightEye = elipse('rightEye');
  var leftEyeColor = elipse('leftEyeColor');
  var rightEyeColor = elipse('rightEyeColor');
  princess.eyes = [rightEye,rightEyeColor,leftEye,leftEyeColor];
  princess.state = 'alive';

  // smallBad start 
  var smallBadTorso1 = rectangle('smallBadTorso1');
  var smallBadTorso2 = rectangle('smallBadTorso2');
  var smallBadFace = ball('smallBadFace');
  var smallBadLeftEye = elipse('smallBadLeftEye');
  var smallBadRightEye = elipse('smallBadRightEye');
  var smallBadLeftEyeColor = elipse('smallBadLeftEyeColor');
  var smallBadRightEyeColor = elipse('smallBadRightEyeColor');
  var smallBadMouth = elipse('smallBadMouth');
  var smallBadLeftEyeBrow = line('smallBadLeftEyeBrow');
  var smallBadRightEyeBrow = line('smallBadRightEyeBrow');
  smallBad.eyes = [smallBadMouth,smallBadRightEye,smallBadRightEyeColor,smallBadLeftEye,smallBadLeftEyeColor];
  smallBad.state = 'alive';
  // small bad finish

  // medium bad start
  var mediumBadFace = ball('mediumBadFace');
  var mediumBadLeftEye = elipse('mediumBadLeftEye');
  var mediumBadRightEye = elipse('mediumBadRightEye');
  var mediumBadLeftEyeColor = elipse('mediumBadLeftEyeColor');
  var mediumBadRightEyeColor = elipse('mediumBadRightEyeColor');
  var mediumBadMouth = elipse('mediumBadMouth');
  var mediumBadLeftEyeBrow = line('mediumBadLeftEyeBrow');
  var mediumBadRightEyeBrow = line('mediumBadRightEyeBrow');
  var mediumBadTorso1 = rectangle('mediumBadTorso1');
  var mediumBadTorso2 = rectangle('mediumBadTorso2');
  var mediumBadHair1 = line('mediumBadHair1');
  var mediumBadHair2 = line('mediumBadHair2');
  var mediumBadHair3 = line('mediumBadHair3');
  mediumBad.eyes = [mediumBadMouth,mediumBadRightEye,mediumBadRightEyeColor,mediumBadLeftEye,mediumBadLeftEyeColor];
  mediumBad.state = 'alive';
  // medium bad end
  // big bad start
  var bigBadFace = ball('bigBadFace');
  var bigBadLeftEye = elipse('bigBadLeftEye');
  var bigBadRightEye = elipse('bigBadRightEye');
  var bigBadLeftEyeColor = elipse('bigBadLeftEyeColor');
  var bigBadRightEyeColor = elipse('bigBadRightEyeColor');
  var bigBadMouth = elipse('bigBadMouth');
  var bigBadLeftEyeBrow = line('bigBadLeftEyeBrow');
  var bigBadRightEyeBrow = line('bigBadRightEyeBrow');
  var bigBadTorso1 = line('bigBadTorso1');
  var bigBadTorso2 = line('bigBadTorso2');
  var bigBadHair1 = line('bigBadHair1');
  var bigBadHair2 = line('bigBadHair2');
  var bigBadHair3 = line('bigBadHair3');
  var bigBadHair4 = line('bigBadHair4');
  bigBad.eyes = [bigBadMouth,bigBadRightEye,bigBadRightEyeColor,bigBadLeftEye,bigBadLeftEyeColor];
  bigBad.state = 'alive';
  // big bad end



  var animateList = [bigBadMouth,bigBadRightEye,bigBadRightEyeColor,bigBadLeftEye,bigBadLeftEyeColor,bigBadFace,mediumBadTorso1,mediumBadTorso2,mediumBadFace,mediumBadMouth,mediumBadRightEye,mediumBadRightEyeColor,mediumBadLeftEye,mediumBadLeftEyeColor,smallBadMouth,smallBadRightEyeColor,smallBadLeftEyeColor,smallBadRightEye,smallBadLeftEye,smallBadFace,smallBadTorso2,smallBadTorso1,surfBoard, torso1, torso2, leftMouth, rightMouth,rightHair,leftHair,face,leftEye,rightEye,rightEyeColor,leftEyeColor];
  var fakeAnimateList = ['bigBadMouth','bigBadRightEye','bigBadRightEyeColor','bigBadLeftEye','bigBadLeftEyeColor','bigBadFace','mediumBadTorso1','mediumBadTorso2','mediumBadFace','mediumBadMouth','mediumBadRightEye','mediumBadRightEyeColor','mediumBadLeftEye','mediumBadLeftEyeColor','smallBadMouth','smallBadRightEyeColor','smallBadLeftEyeColor','smallBadRightEye','smallBadLeftEye','smallBadFace','smallBadTorso2','smallBadTorso1','surfBoard', 'torso1', 'torso2', 'leftMouth', 'rightMouth','rightHair','leftHair','face','leftEye','rightEye','rightEyeColor','leftEyeColor'];

  function startBall1(){
    ball1.dy = -7.5;
  }
  function startBall2(){
    ball2.dy = -5;
  }
  function startBall3(){
    ball3.dy = -4;
  }
  function startBall4(){
    ball4.dy = -4;
  }
  function startBall5(){
    ball5.dy = -5;
  }
  function startBall6(){
    ball6.dy = -7.5;
  }
  var deflectFactor = .1;
  function collideBallWith(ball,what,freezeFunc) {
    if(ball.bottom < what.top || ball.top > what.bottom) {
      return;
    }
    var voff = ball.cx - what.cx;
    if(ball.dx > 0) {
      if (ball.right >= what.left && ball.left < what.right) {  
        ball.dx += voff * deflectFactor * 0.5;
        ball.dy *= -1;
        what.dx *= -0.25;
        what.dy += -0.5;
        freezeFunc();
        }
    } else {
        if(ball.left <= what.right && ball.right > what.left) {
          ball.dx += voff * deflectFactor * 0.5;
          ball.dy *= -1;
          what.dx *= -0.25;
          what.dy += -0.5;
          freezeFunc();
        }
    }
  }

  var dir;
  if(Math.random() > .5){
    dir = 'left';
  }
  else{
    dir = 'right';
  }
  var animateListLength = animateList.length;

  function freezePrincess(){
    for(var i=0;i<princess.pieces.length;i++){
      princess.pieces[i].dx = 0;
      dir = 'stop';
      if(princess.state === 'alive'){
        explodePrincess()
        
      }
    }
  }
  function freezeSmallBad(){
    for(var i=0;i<smallBad.pieces.length;i++){
      smallBad.pieces[i].dx = 0;
      if(smallBad.pieces[i].dx1 != null){
        smallBad.pieces[i].dx1 = 0;
        smallBad.pieces[i].dx2 = 0;
      }
      dir = 'stop';
      if(smallBad.state === 'alive'){
        explodeSmallBad()
        smallBad.state = 'dead'
      }
    }
  }
  function freezeMediumBad(){
    for(var i=0;i<mediumBad.pieces.length;i++){
      mediumBad.pieces[i].dx = 0;
      if(mediumBad.pieces[i].dx1 != null){
        mediumBad.pieces[i].dx1 = 0;
        mediumBad.pieces[i].dx2 = 0;
      }
      dir = 'stop';
      if(mediumBad.state === 'alive'){
        explodeMediumBad()
        mediumBad.state = 'dead'
      }
    }
  }
  function freezeBigBad(){
    for(var i=0;i<bigBad.pieces.length;i++){
      bigBad.pieces[i].dx = 0;
      if(bigBad.pieces[i].dx1 != null){
        bigBad.pieces[i].dx1 = 0;
        bigBad.pieces[i].dx2 = 0;
      }
    }
    dir = 'stop';
    if(bigBad.state === 'alive'){
      bigBadFace.dx = 22 * Math.random();
      bigBadFace.dy = 6;
      bigBad.state = 'dead'
      explodeBigBad()
      
    }
  }
  function explodePrincess(){
    for(var i=0;i<princess.eyes.length;i++){
      if(Math.random() > 0.5){
        princess.eyes[i].dx = 3.25 * Math.random();
        princess.eyes[i].dy = 3.25 * Math.random();
      }
      else{
        princess.eyes[i].dx = -2 * Math.random();
        princess.eyes[i].dy = -2 * Math.random();
      }
    }
    setTimeout(princessRemove,4000);
  
  }
  function explodeSmallBad(){
    for(var i=0;i<smallBad.eyes.length;i++){
      if(Math.random() > 0.5){
        smallBad.eyes[i].dx = 7 * Math.random();
        smallBad.eyes[i].dy = 7 * Math.random();
      }
      else{
        smallBad.eyes[i].dx = -7 * Math.random();
        smallBad.eyes[i].dy = -7 * Math.random();
      }
    }
    setTimeout(smallBadRemove,4000);
    if(smallBad.state === 'alive' || mediumBad.state === 'alive' || bigBad.state === 'alive'){
      goodShot();
    }
    setTimeout(removeElement,1000);
  }

  function explodeMediumBad(){
    for(var i=0;i<mediumBad.eyes.length;i++){
      if(Math.random() > 0.5){
        mediumBad.eyes[i].dx = 9 * Math.random();
        mediumBad.eyes[i].dy = 9 * Math.random();
      }
      else{
        mediumBad.eyes[i].dx = -10 * Math.random();
        mediumBad.eyes[i].dy = -10 * Math.random();
      }
    }
    setTimeout(mediumBadRemove,4000);
    if(smallBad.state === 'alive' || mediumBad.state === 'alive' || bigBad.state === 'alive'){
      goodShot();
    }
    setTimeout(removeElement,1000);
  }
  function explodeBigBad(){
    for(var i=0;i<bigBad.eyes.length;i++){
      if(Math.random() > 0.5){
        bigBad.eyes[i].dx = 9 * Math.random();
        bigBad.eyes[i].dy = 9 * Math.random();
      }
      else{
        bigBad.eyes[i].dx = -10 * Math.random();
        bigBad.eyes[i].dy = -10 * Math.random();
      }
    }
    setTimeout(bigBadRemove,4000);
    if(smallBad.state === 'alive' || mediumBad.state === 'alive' || bigBad.state === 'alive'){
      goodShot();
    }
    var bigFace = animateList.indexOf(bigBadFace);
    animateList.splice(bigFace,1);
    var bigLeftEye = animateList.indexOf(bigBadLeftEye);
    animateList.splice(bigLeftEye,1);
    var bigRightEye = animateList.indexOf(bigBadRightEye);
    animateList.splice(bigRightEye,1);
    var bigLeftEyeColor = animateList.indexOf(bigBadLeftEyeColor);
    animateList.splice(bigLeftEyeColor,1);
    var bigRightEyeColor = animateList.indexOf(bigBadRightEyeColor);
    animateList.splice(bigRightEyeColor,1);
    var bigMouth = animateList.indexOf(bigBadMouth);
    animateList.splice(bigMouth,1);
    // var bigLeftEyeBrow = animateList.indexOf(bigBadLeftEyeBrow);
    // animateList.splice(bigLeftEyeBrow,1);
    // var bigRightEyeBrow = animateList.indexOf(bigBadRightEyeBrow);
    // animateList.splice(bigRightEyeBrow,1);
    animateListLength = animateList.length
    
    setTimeout(removeElement,1000);
  }

  princess.strings = ['torso1', 'torso2', 'leftMouth', 'rightMouth','rightHair','leftHair','rightEye','leftEye','rightEyeColor','leftEyeColor'];
  princess.pieces = [torso1, torso2, leftMouth, rightMouth,rightHair,leftHair,leftEye,rightEye,rightEyeColor,leftEyeColor];
  smallBad.strings = ['smallBadLeftEyeBrow','smallBadRightEyeBrow','smallBadMouth','smallBadRightEyeColor','smallBadLeftEyeColor','smallBadRightEye','smallBadLeftEye','smallBadFace','smallBadTorso2','smallBadTorso1'];
  smallBad.pieces = [smallBadLeftEyeBrow,smallBadRightEyeBrow,smallBadMouth,smallBadRightEyeColor,smallBadLeftEyeColor,smallBadRightEye,smallBadLeftEye,smallBadFace,smallBadTorso2,smallBadTorso1];
  mediumBad.strings = ['mediumBadHair1','mediumBadHair2','mediumBadHair3','mediumBadTorso1','mediumBadTorso2','mediumBadLeftEyeBrow','mediumBadRightEyeBrow','mediumBadFace','mediumBadMouth','mediumBadRightEye','mediumBadRightEyeColor','mediumBadLeftEye','mediumBadLeftEyeColor'];
  mediumBad.pieces = [mediumBadHair1,mediumBadHair2,mediumBadHair3,mediumBadTorso1,mediumBadTorso2,mediumBadLeftEyeBrow,mediumBadRightEyeBrow,mediumBadFace,mediumBadMouth,mediumBadRightEye,mediumBadRightEyeColor,mediumBadLeftEye,mediumBadLeftEyeColor];
  bigBad.strings = ['bigBadRightEyeBrow','bigBadLeftEyeBrow','bigBadTorso2','bigBadTorso1','bigBadHair4','bigBadHair3','bigBadHair2','bigBadHair1'];
  bigBad.pieces = [bigBadTorso2,bigBadTorso1,bigBadHair4,bigBadHair3,bigBadHair2,bigBadHair1,bigBadRightEyeBrow,bigBadLeftEyeBrow,bigBadMouth,bigBadRightEye,bigBadFace,bigBadRightEyeColor,bigBadLeftEye,bigBadLeftEyeColor];
  function princessRemove(){
    for(var i=0;i<princess.strings.length;i++){
      var one = document.getElementById(princess.strings[i]);
      one.remove();
      expired();
      tryAgain('Try Again!');
      princess.state = 'dead';
    }
    
  }
  function smallBadRemove(){
    for(var i=0;i<smallBad.strings.length;i++){
      var one = document.getElementById(smallBad.strings[i]);
      one.remove();
    }
  }
  function mediumBadRemove(){
    for(var i=0;i<mediumBad.strings.length;i++){
      var one = document.getElementById(mediumBad.strings[i]);
      one.remove();
    }
  }
  function bigBadRemove(){
    for(var i=0;i<bigBad.strings.length;i++){
      var one = document.getElementById(bigBad.strings[i]);
      one.remove();
    }
    
    
  }
  
  var speed = 4;
  var lineList = [bigBadTorso2,bigBadTorso1,bigBadHair4,bigBadHair3,bigBadHair2,bigBadHair1,bigBadRightEyeBrow,bigBadLeftEyeBrow,mediumBadHair1,mediumBadHair2,mediumBadHair3,smallBadRightEyeBrow,smallBadLeftEyeBrow,mediumBadLeftEyeBrow,mediumBadRightEyeBrow];
  var lineListLength = lineList.length;
  var clock = function(){
    var last = Date.now();
    return{
      reset: function(){
        var now = Date.now();
        var result = now - last;
        last = now;
        return result;
      }
    }
  }();
  var animSpeed = 0.1;
  var deflectFactor = 0.1;
  var animate = function(){
    
    if(princess.state === 'alive'){
      if(smallBad.state === 'dead' && mediumBad.state === 'dead' && bigBad.state === 'dead' ){
        savedPrincess();
        bigBad.state = 'dead twice';
        tryAgain('Save Her Again?');
      }
      if(surfBoard.cx < -400){
        dir = 'right'
      }
      if(surfBoard.cx > 900){
        dir = 'left'
      }
      if(ball1.cy > -25 && ball1.cy < 700){
        ball1.cy += ball1.dy;
        collideBallWith(ball1,face,freezePrincess);
        collideBallWith(ball1,smallBadFace,freezeSmallBad);
        collideBallWith(ball1,mediumBadFace,freezeMediumBad);
      }
      if(ball2.cy > -25 && ball2.cy < 700){
        ball2.cy += ball2.dy;
        collideBallWith(ball2,face,freezePrincess);
        collideBallWith(ball2,smallBadFace,freezeSmallBad);
        collideBallWith(ball2,mediumBadFace,freezeMediumBad);
      }
      
      ball3.cy += ball3.dy;
      ball4.cy += ball4.dy;
      ball5.cy += ball5.dy;
      ball6.cy += ball6.dy;
      var i;
      
      for(i=0;i<animateListLength;i++){
        animateList[i].cx += animateList[i].dx;
        animateList[i].cy += animateList[i].dy;
      }
      if(dir === 'right'){
        for(i=0;i<animateListLength;i++){
          animateList[i].dx = 5;
        }
      }
      if(dir === 'left'){
          for(i=0;i<animateListLength;i++){
            animateList[i].dx = -5;
          }
      }
      for(i=0;i<lineListLength;i++){
        lineList[i].x1 += lineList[i].dx1;
        lineList[i].x2 += lineList[i].dx2;
      }
      if(dir === 'right'){
        for(i=0;i<lineListLength;i++){
          lineList[i].dx1 = 5;
          lineList[i].dx2 = 5;
        }
      }
      if(dir === 'left'){
        for(i=0;i<lineListLength;i++){
          lineList[i].dx1 = -5;
          lineList[i].dx2 = -5;
        }
      }
      if(bigBad.state === 'dead'){
        if(bigBadFace.bottom > 600){
          bigBadFace.bottom = 600;
          bigBadFace.dy *= -1.01;
        }
        if(bigBadFace.top < 0){
          bigBadFace.top = 0;
          bigBadFace.dy *= -1.01;
        }
        if(bigBadFace.right > 800){
          bigBadFace.right = 800;
          bigBadFace.dx *= -1.01;
        }
        if(bigBadFace.left < 0){
          bigBadFace.left = 0;
          bigBadFace.dx *= -1.01;
        }
        
        bigBadFace.cx += bigBadFace.dx;
        bigBadFace.cy += bigBadFace.dy;
        bigBadLeftEye.cx = bigBadFace.cx-11;
        bigBadLeftEye.cy = bigBadFace.cy-10;
        bigBadRightEye.cx = bigBadFace.cx+11;
        bigBadRightEye.cy = bigBadFace.cy-10;
        bigBadLeftEyeColor.cx = bigBadFace.cx-11;
        bigBadLeftEyeColor.cy = bigBadFace.cy-10;
        bigBadRightEyeColor.cx = bigBadFace.cx+11;
        bigBadRightEyeColor.cy = bigBadFace.cy-10;
        bigBadMouth.cx = bigBadFace.cx;
        bigBadMouth.cy = bigBadFace.cy+10;
      }
      if(bigBad.state === 'alive'){
        collideBallWith(ball1,bigBadFace,freezeBigBad);
        collideBallWith(ball2,bigBadFace,freezeBigBad);
        collideBallWith(ball3,bigBadFace,freezeBigBad);
        collideBallWith(ball4,bigBadFace,freezeBigBad);
        collideBallWith(ball5,bigBadFace,freezeBigBad);
        collideBallWith(ball6,bigBadFace,freezeBigBad);
      }

      collideBallWith(ball3,mediumBadFace,freezeMediumBad);
      collideBallWith(ball4,mediumBadFace,freezeMediumBad);
      collideBallWith(ball5,mediumBadFace,freezeMediumBad);
      collideBallWith(ball6,mediumBadFace,freezeMediumBad);
      
      collideBallWith(ball3,smallBadFace,freezeSmallBad);
      collideBallWith(ball4,smallBadFace,freezeSmallBad);
      collideBallWith(ball5,smallBadFace,freezeSmallBad);
      collideBallWith(ball6,smallBadFace,freezeSmallBad);
      if(princess.state === 'alive'){
        collideBallWith(bigBadFace,face,freezePrincess);
        collideBallWith(ball3,face,freezePrincess);
        collideBallWith(ball4,face,freezePrincess);
        collideBallWith(ball5,face,freezePrincess);
        collideBallWith(ball6,face,freezePrincess);
      }
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);

};








