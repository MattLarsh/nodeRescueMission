(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
function startExplosion(){
  startExplosion.explosion = 'reset';
  var clearStartButton = document.getElementById('clearStartButton');
  clearStartButton.onmouseover = function(){
    if(startExplosion.explosion === 'reset'){
      hoverExplosion();
      startExplosion.explosion = 'started';
    }
  };
  clearStartButton.onmouseout = function(){
    
  };
};
startExplosion();
startExplosion.game = 'game not started';
function hoverExplosion(){
  var x;
  var y;
  for(var i=0,len=roundObjects.length;i<len;i++){
    if(Math.random() > 0.5){
      x = 14;
    }
    else{
      x = -14;
    }
    if(Math.random() < 0.5){
      y = 14;
    }
    else{
      y = -14;
    }
    roundObjects[i].dx = x * Math.random();
    roundObjects[i].dy = y * Math.random();
  }
  for(var i=0,len=lineObjects.length;i<len;i++){
    if(Math.random() > 0.5){
      x = 100 * Math.random();
    }
    else{
      x = -100 * Math.random();
    }
    lineObjects[i].dx1 = x;
    lineObjects[i].dx2 = x;
  }
}
function explosionDone(){
  for(var i=0,len=roundObjects.length;i<len;i++){
    if(roundObjects[i].dx != 0 || roundObjects[i].dy != 0){
      return 
    }
    else if(startExplosion.explosion === 'started'){
      startExplosion.explosion = 'done';
    }
  }
}
function animate(){
  console.log(startExplosion.explosion);
  for(var i=0,len=roundObjects.length;i<len;i++){
    roundObjects[i].cx += roundObjects[i].dx;
    roundObjects[i].cy += roundObjects[i].dy;
    if(roundObjects[i].cx < 0 || roundObjects[i].cx > 1050 || roundObjects[i].cy < 0 || roundObjects[i].cy > 575){
      roundObjects[i].dx = 0;
      roundObjects[i].dy = 0;
    }
  }
  for(var i=0,len=lineObjects.length;i<len;i++){
    lineObjects[i].x1 += lineObjects[i].dx1;
    lineObjects[i].x2 += lineObjects[i].dx2;
    if(lineObjects[i].x1 < 0 || lineObjects[i].x2 > 1050){
      lineObjects[i].dx1 = 0;
      lineObjects[i].dx2 = 0;
    }
  }

  if(startExplosion.explosion === 'done'){
    origHorzRoundPos();
    origVertRoundPos();
    origX1LinePos();
    origX2LinePos();
  }


  explosionDone()
  if(startExplosion.game === 'game not started'){
    requestAnimationFrame(animate);
  }
}


var createLineObject = function(e){
  var r = {};
  r.dx1 = 0;
  r.dx2 = 0;
  r.dy1 = 0;
  r.dy2 = 0;
  r.x1Orig = e.x1.baseVal.value;
  r.x2Orig = e.x2.baseVal.value;
  r.y1Orig = e.y1.baseVal.value;
  r.y2Orig = e.y2.baseVal.value;
  Object.defineProperty(r, 'x1', {
    get: function(){return e.x1.baseVal.value},
    set: function(val){e.x1.baseVal.value = val;}
  });
  Object.defineProperty(r, 'x2', {
    get: function(){return e.x2.baseVal.value},
    set: function(val){e.x2.baseVal.value = val;}
  });
  Object.defineProperty(r, 'y1', {
    get: function(){return e.y1.baseVal.value},
    set: function(val){e.y1.baseVal.value = val;}
  });
  Object.defineProperty(r, 'y2', {
    get: function(){return e.y2.baseVal.value},
    set: function(val){e.y2.baseVal.value = val;}
  });
  return r;
};
var createBallObj = function(e){
  var r = {};
  r.dx = 0;
  r.dy = 0;
  r.cxOrig = e.cx.baseVal.value;
  r.cyOrig = e.cy.baseVal.value;
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
}
var createEllipseObj = function(e){
  var r = {};
  r.dx = 0;
  r.dy = 0;
  r.cxOrig = e.cx.baseVal.value;
  r.cyOrig = e.cy.baseVal.value;
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
var tor1 = document.getElementById('torso1');
var tor2 = document.getElementById('torso2');
var hair1 = document.getElementById('hair1');
var hair2 = document.getElementById('hair2');

var head = document.getElementById('head');
var leftEye = document.getElementById('leftEye');
var rightEye = document.getElementById('rightEye');
var leftEyeC =  document.getElementById('leftEyeC');
var rightEyeC = document.getElementById('rightEyeC');
var mouth = document.getElementById('mouth');

var tor1Obj = createLineObject(tor1);
var tor2Obj = createLineObject(tor2);
var hair1Obj = createLineObject(hair1);
var hair2Obj = createLineObject(hair2);

var headObj = createBallObj(head);
var leftEyeObj = createEllipseObj(leftEye);
var rightEyeObj = createEllipseObj(rightEye);
var leftEyeCObj = createEllipseObj(leftEyeC);
var rightEyeCObj = createEllipseObj(rightEyeC);
var mouthObj = createEllipseObj(mouth);

var roundObjects = [headObj,leftEyeObj,rightEyeObj,leftEyeCObj,rightEyeCObj,mouthObj];
var lineObjects = [tor1Obj,tor2Obj,hair1Obj,hair2Obj];

function origHorzRoundPos(){
  for(var i=0,len=roundObjects.length;i<len;i++){
    if(Math.round(roundObjects[i].cx) < Math.round(roundObjects[i].cxOrig)){
      roundObjects[i].dx = 1
      startExplosion.explosion = 'not reset';
    }
    else if(Math.round(roundObjects[i].cx) > Math.round(roundObjects[i].cxOrig)){
      roundObjects[i].dx = -1
      startExplosion.explosion = 'not reset';
    }
    else{
      roundObjects[i].dx = 0;
    }
  }
  if(startExplosion.explosion === 'not reset'){
    startExplosion.explosion = 'done';
  }
  else{
    origHorzRoundPos.explosion = 'reset';
  } 
}
function origVertRoundPos(){
  for(var i=0,len=roundObjects.length;i<len;i++){
    if(Math.round(roundObjects[i].cy) < Math.round(roundObjects[i].cyOrig)){
      roundObjects[i].dy = 1
      startExplosion.explosion = 'not reset';
    }
    else if(Math.round(roundObjects[i].cy) > Math.round(roundObjects[i].cyOrig)){
      roundObjects[i].dy = -1
      startExplosion.explosion = 'not reset';
    }
    else{
      roundObjects[i].dy = 0;
    }
  }
  if(startExplosion.explosion === 'not reset'){
    startExplosion.explosion = 'done';
  }
  else if(origHorzRoundPos.explosion === 'reset'){
    origVertRoundPos.explosion = 'reset';
  } 
}
function origX1LinePos(){
  for(var i=0,len=lineObjects.length;i<len;i++){
    if(Math.round(lineObjects[i].x1) < Math.round(lineObjects[i].x1Orig)){
      lineObjects[i].dx1 = 1
      startExplosion.explosion = 'not reset';
    }
    else if(Math.round(lineObjects[i].x1) > Math.round(lineObjects[i].x1Orig)){
      lineObjects[i].dx1 = -1
      startExplosion.explosion = 'not reset';
    }
    else{
      lineObjects[i].dx1 = 0;
    }
  }
  if(startExplosion.explosion === 'not reset'){
    startExplosion.explosion = 'done';
  }
  else if(origVertRoundPos.explosion === 'reset'){
    origX1LinePos.explosion = 'reset';
  } 
}
function origX2LinePos(){
  for(var i=0,len=lineObjects.length;i<len;i++){
    if(Math.round(lineObjects[i].x2) < Math.round(lineObjects[i].x2Orig)){
      lineObjects[i].dx2 = 1
      startExplosion.explosion = 'not reset';
    }
    else if(Math.round(lineObjects[i].x2) > Math.round(lineObjects[i].x2Orig)){
      lineObjects[i].dx2 = -1
      startExplosion.explosion = 'not reset';
    }
    else{
      lineObjects[i].dx2 = 0;
    }
  }
  if(startExplosion.explosion === 'not reset'){
    startExplosion.explosion = 'done';
  }
  else if(origX1LinePos.explosion === 'reset'){
    console.log('hi');
    startExplosion.explosion = 'reset';
  } 
}

requestAnimationFrame(animate);


var startGame = function(){
  startExplosion.game = 'started';
  var removeStartPage = function(){
    document.getElementById('save').remove();
    document.getElementById('torso1').remove();
    document.getElementById('torso2').remove();
    document.getElementById('head').remove();
    document.getElementById('leftEye').remove();
    document.getElementById('rightEye').remove();
    document.getElementById('leftEyeC').remove();
    document.getElementById('rightEyeC').remove();
    document.getElementById('hair1').remove();
    document.getElementById('hair2').remove();
    document.getElementById('mouth').remove();
    document.getElementById('startButton').remove();
    document.getElementById('play').remove();
    document.getElementById('clearStartButton').remove();
  }();

  (function () {
      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;
  })();
  
  var svgNS = "http://www.w3.org/2000/svg";
  var structure = {};
  var weapon = {};
  
  function createLineElement(x1,x2,y1,y2,strWdth,color) {
    var newLine = document.createElementNS(svgNS,"line");
    newLine.setAttributeNS(null,"x1",x1); 
    newLine.setAttributeNS(null,"x2",x2);   
    newLine.setAttributeNS(null,"y1",y1);   
    newLine.setAttributeNS(null,"y2",y2); 
    newLine.setAttributeNS(null,"stroke",color);    
    newLine.setAttributeNS(null,"stroke-width", strWdth);
    document.getElementById("field").appendChild(newLine);
    return newLine;
  }
  function createRectElement(width,height,x,y,opacity,fill,rx,stroke) {
    var newRect = document.createElementNS(svgNS,"rect");
    newRect.setAttributeNS(null,"width",width); 
    newRect.setAttributeNS(null,"height",height);    
    newRect.setAttributeNS(null,"x",x);   
    newRect.setAttributeNS(null,"y",y);  
    newRect.setAttributeNS(null,"fill-opacity",opacity);    
    newRect.setAttributeNS(null,"fill",fill);
    newRect.setAttributeNS(null,"rx",rx);
    newRect.setAttributeNS(null,"stroke",stroke);
    document.getElementById("field").appendChild(newRect);
    return newRect;
  }
  
  var boardEle1 = createLineElement(820,820,450,550,10,'brown');
  var boardEle2 = createLineElement(870,870,450,550,10,'brown');
  var boardEle3 = createLineElement(920,920,450,550,10,'brown');
  var boardEle4 = createLineElement(970,970,450,550,10,'brown');
  var boardEleTop1 = createLineElement(800,885,450,450,10,'brown');
  var boardEleTop2 = createLineElement(905,990,450,450,10,'brown');
  var boardEle5 = createLineElement(820,820,400,450,10,'brown');
  var boardEle6 = createLineElement(870,870,400,450,10,'brown');
  var boardEle7 = createLineElement(920,920,400,450,10,'brown');
  var boardEle8 = createLineElement(970,970,400,450,10,'brown');
  var boardEleTop3 = createLineElement(800,990,400,400,10,'brown');
  var boardEle9 = createLineElement(842.5,842.5,320,400,10,'brown');
  var boardEle10 = createLineElement(895,895,320,400,10,'brown');
  var boardEle11 = createLineElement(942.5,942.5,320,400,10,'brown');
  var boardEleTop4 = createLineElement(800,990,320,320,10,'brown');
  var boardEle12 = createLineElement(869,869,320,275,10,'brown');
  var boardEle13 = createLineElement(924,924,320,275,10,'brown');
  var boardEleTop5 = createLineElement(842.5,950,275,275,10,'brown');
  var boardEle14 = createLineElement(900,900,275,150,10,'brown');
  var boardEleTop6 = createLineElement(872.5,925,150,150,10,'brown');
  var createLineObject = function(e){
    var r = {};
    r.dx1 = 0;
    r.dx2 = 0;
    r.dy1 = 0;
    r.dy2 = 0;
    Object.defineProperty(r, 'x1', {
      get: function(){return e.x1.baseVal.value},
      set: function(val){e.x1.baseVal.value = val;}
    });
    Object.defineProperty(r, 'x2', {
      get: function(){return e.x2.baseVal.value},
      set: function(val){e.x2.baseVal.value = val;}
    });
    Object.defineProperty(r, 'y1', {
      get: function(){return e.y1.baseVal.value},
      set: function(val){e.y1.baseVal.value = val;}
    });
    Object.defineProperty(r, 'y2', {
      get: function(){return e.y2.baseVal.value},
      set: function(val){e.y2.baseVal.value = val;}
    });
    return r;
  };
  var boardObj1 = createLineObject(boardEle1);
  var boardObj2 = createLineObject(boardEle2);
  var boardObj3 = createLineObject(boardEle3);
  var boardObj4 = createLineObject(boardEle4);
  var boardTopObj1 = createLineObject(boardEleTop1);
  var boardTopObj2 = createLineObject(boardEleTop2);
  var boardObj5 = createLineObject(boardEle5);
  var boardObj6 = createLineObject(boardEle6);
  var boardObj7 = createLineObject(boardEle7);
  var boardObj8 = createLineObject(boardEle8);
  var boardTopObj3 = createLineObject(boardEleTop3);
  var boardObj9 = createLineObject(boardEle9);
  var boardObj10 = createLineObject(boardEle10);
  var boardObj11 = createLineObject(boardEle11);
  var boardTopObj4 = createLineObject(boardEleTop4);
  var boardObj12 = createLineObject(boardEle12);
  var boardObj13 = createLineObject(boardEle13);
  var boardTopObj5 = createLineObject(boardEleTop5);
  var boardObj14 = createLineObject(boardEle14);
  var boardTopObj6 = createLineObject(boardEleTop6);
  var boardObjectsArr = [boardObj1,boardObj2,boardObj3,boardObj4,boardTopObj1,boardTopObj2,boardObj5,boardObj6,boardObj7,boardObj8,boardTopObj3,boardObj9,boardObj10,boardObj11,boardTopObj4,boardObj12,boardObj13,boardTopObj5,boardObj14,boardTopObj6];

  function createBallElement(cx,cy,r,color) {
    var newBall = document.createElementNS(svgNS,"circle");
    newBall.setAttributeNS(null,"cx",cx);  
    newBall.setAttributeNS(null,"cy",cy);    
    newBall.setAttributeNS(null,"r",r);      
    newBall.setAttributeNS(null,"fill",color);   
    document.getElementById("field").appendChild(newBall);
    return newBall;
  }

  var createBallObj = function(e){
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
  }

  var createEllipseObj = function(e){
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

  function createEllipseElement(cx,cy,rx,ry,color,opacity,stroke) {
    var newEllipse = document.createElementNS(svgNS,"ellipse");
    newEllipse.setAttributeNS(null,"cx",cx);  
    newEllipse.setAttributeNS(null,"cy",cy);    
    newEllipse.setAttributeNS(null,"rx",rx);  
    newEllipse.setAttributeNS(null,"ry",ry);    
    newEllipse.setAttributeNS(null,"fill",color);
    newEllipse.setAttributeNS(null,"fill-opacity",opacity); 
    newEllipse.setAttributeNS(null,"stroke",stroke);    
    document.getElementById("field").appendChild(newEllipse);
    return newEllipse;
  }
  function createTextElement(x,y,fontSize,textAnchor,opacity,color,text,fontFamily) {
    var newText = document.createElementNS(svgNS,"text");
    newText.setAttributeNS(null,"x",x);    
    newText.setAttributeNS(null,"y",y);  
    newText.setAttributeNS(null,"font-size",fontSize);
    newText.setAttributeNS(null,"text-anchor",textAnchor);
    newText.setAttributeNS(null,"fill-opacity",opacity);    
    newText.setAttributeNS(null,"fill",color);
    newText.setAttributeNS(null,"font-family",fontFamily);
    var textNode = document.createTextNode(text);
    newText.appendChild(textNode);
    document.getElementById("field").appendChild(newText);
    return newText
  }
  
  var hostage = {};
  var hostageStuff = {};
  //Start blood
  var bloodEleArr = [];
  var bloodObjArr = [];

  function createBlood(eleArr,objArr,x,y){
    for(var i=0;i<200;i++){
      eleArr[i] = createEllipseElement(x,y,5,5,'red');
    }
    for(var i=0;i<200;i++){
      objArr[i] = createEllipseObj(eleArr[i]);
    }
  }
  function bloodExplosion(objArr){
    var x;
    var y;
    for(var i=0,len=objArr.length;i<len;i++){
      if(Math.random() > 0.5){
        x = 100;
      }
      else{
        x = -100;
      }
      if(Math.random() < 0.5){
        y = 100;
      }
      else{
        y = -100;
      }
      objArr[i].dx = x * Math.random();
      objArr[i].dy = y * Math.random();
    }
  }
  // End blood

  // Start of Hostage 
  
  hostage.torso1Ele = createLineElement(873,927,120,120,18,'#FFB1E5');
  hostage.torso2Ele = createLineElement(880,917,130,130,30,'#FFB1E5');
  hostage.headEle = createBallElement(900,100,25,'#FFE1CE');
  hostage.leftEyeEle = createEllipseElement(894,97,8,10,'white');
  hostage.rightEyeEle = createEllipseElement(906,97,8,10,'white');
  hostage.leftEyeColorEle = createEllipseElement(894,95,1.5,1.5,'#1E181A');
  hostage.rightEyeColorEle = createEllipseElement(907,95,1.5,1.5,'#1E181A');
  hostage.hair1Ele = createLineElement(858,905,104,70,15,'#FFFF01');
  hostage.hair2Ele = createLineElement(900,944,69,110,15,'#FFFF01');
  hostage.mouthEle = createEllipseElement(902,112,4,4,'#1E181A');
  
  var hostageHeadObj = createBallObj(hostage.headEle);
  var hostageLeftEyeObj = createEllipseObj(hostage.leftEyeEle);
  var hostageRightEyeObj = createEllipseObj(hostage.rightEyeEle);
  var hostageLeftEyeColorObj = createEllipseObj(hostage.leftEyeColorEle);
  var hostageRightEyeColorObj = createEllipseObj(hostage.rightEyeColorEle);
  var hostageMouthObj = createEllipseObj(hostage.mouthEle);
  var hostageTorso1Obj = createLineObject(hostage.torso1Ele);
  var hostageTorso2Obj = createLineObject(hostage.torso2Ele);
  var hostageHair1Obj = createLineObject(hostage.hair1Ele);
  var hostageHair2Obj = createLineObject(hostage.hair2Ele);

  var hostageLineObjects = [hostageHair2Obj,hostageHair1Obj,hostageTorso1Obj,hostageTorso2Obj];
  var hostageRoundObjects = [hostageMouthObj,hostageRightEyeColorObj,hostageLeftEyeColorObj,hostageHeadObj,hostageLeftEyeObj,hostageRightEyeObj];

  // End of hostage

  

  function explodeHostage(){
    var x;
    for(var i=0,len=hostageRoundObjects.length;i<len;i++){
      if(Math.random() > 0.5){
        x = 14;
      }
      else{
        x = -14;
      }
      hostageRoundObjects[i].dx = x * Math.random();
      hostageRoundObjects[i].dy = x * Math.random();
    }
    for(var i=0,len=hostageLineObjects.length;i<len;i++){
      if(Math.random() > 0.5){
        x = 100 * Math.random();
      }
      else{
        x = -100 * Math.random();
      }
      hostageLineObjects[i].dx1 = x;
      hostageLineObjects[i].dx2 = x;
    }
    setTimeout(removeHostage,2500);
  }
  
  function removeHostage(){
    for(var key in hostage){
      hostage[key].remove();
    }
    for(var i=0,len=bloodEleArr.length;i<len;i++){
      bloodEleArr[i].remove();
    }
  }
  
  
  var view = field.viewBox.baseVal;
  function structureHit1(){
    boardObjectsArr[0].dx1 = 2;
    boardObjectsArr[1].dx1 = 0.5;
    boardObjectsArr[2].dx1 = 1.2;
    boardObjectsArr[3].dx1 = 1.3;
    boardObjectsArr[4].dx1 = -1;
    boardObjectsArr[4].dx2 = -1;
    boardObjectsArr[6].dx1 = 2.2;
    boardObjectsArr[6].dx2 = 2.2;
    boardObjectsArr[7].dx1 = -3;
    boardObjectsArr[8].dx1 = 1.3;
    boardObjectsArr[9].dx1 = -1;
    boardObjectsArr[10].dx1 = 1;
    boardObjectsArr[10].dx2 = 1;
    boardObjectsArr[11].dx1 = 1.25;
    boardObjectsArr[12].dx1 = -2;
    boardObjectsArr[13].dx1 = 1.45;
    boardObjectsArr[14].dx1 = 1.25;
    boardObjectsArr[14].dx2 = 1.25;
    boardObjectsArr[15].dx1 = -2;
    boardObjectsArr[16].dx1 = -1.4;
    boardObjectsArr[17].dx1 = 1.4;
    boardObjectsArr[17].dx2 = 1.4;
    boardObjectsArr[18].dx2 = 2;
    boardObjectsArr[19].dx1 = 2;
    boardObjectsArr[19].dx2 = 2;
    for(var i=0,len=hostageLineObjects.length;i<len;i++){
      hostageLineObjects[i].dx1 = 2;
      hostageLineObjects[i].dx2 = 2;
    }
    for(var i=0,len=hostageRoundObjects.length;i<len;i++){
      hostageRoundObjects[i].dx = 2;
    }
    
  }
  function structureHit2(){
    boardObjectsArr[0].dx1 = 8;
    boardObjectsArr[0].dx2 = 2;
    boardObjectsArr[0].dy1 = 2.5;
    boardObjectsArr[1].dx1 = 5;
    boardObjectsArr[1].dy1 = 2.5;
    boardObjectsArr[2].dx1 = -7.5;
    boardObjectsArr[2].dx2 = -0.25;
    boardObjectsArr[2].dy2 = -1;
    boardObjectsArr[2].dy1 = 1.25;
    boardObjectsArr[3].dx1 = -1;
    boardObjectsArr[4].dy1 = 3;
    boardObjectsArr[5].dx1 = 3;
    boardObjectsArr[5].dx2 = 3;
    boardObjectsArr[6].dy2 = 8;
    boardObjectsArr[6].dy1 = 8;
    boardObjectsArr[7].dy2 = 1.4;
    boardObjectsArr[7].dy1 = 1.4;
    boardObjectsArr[7].dx2 = -3;
    boardObjectsArr[7].dx1 = 0;
    boardObjectsArr[8].dy2 = 8;
    boardObjectsArr[8].dy1 = 8;
    boardObjectsArr[9].dx2 = 2;
    boardObjectsArr[9].dx1 = 2;
    boardObjectsArr[10].dy1 = 1.4;
    boardObjectsArr[11].dy2 = 1.4;
    boardObjectsArr[11].dy1 = 1.4;
    boardObjectsArr[11].dx2 = 1;
    boardObjectsArr[12].dy1 = 10;
    boardObjectsArr[12].dy2 = 10;
    boardObjectsArr[13].dy1 = 1;
    boardObjectsArr[13].dy2 = 1;
    boardObjectsArr[14].dy1 = 2;
    boardObjectsArr[14].dy2 = 0.75;
    boardObjectsArr[15].dy1 = 2;
    boardObjectsArr[15].dy2 = 2;
    boardObjectsArr[16].dy1 = 1.25;
    boardObjectsArr[16].dy2 = 1.25;
    boardObjectsArr[17].dy1 = 2;
    boardObjectsArr[17].dy2 = 1.25;
    boardObjectsArr[17].dx1 = -2;
    boardObjectsArr[17].dx2 = -2;
    boardObjectsArr[18].dy1 = 1.5;
    boardObjectsArr[18].dy2 = 1.25;
    boardObjectsArr[18].dx1 = 0;
    boardObjectsArr[18].dx2 = -3;
    boardObjectsArr[19].dy1 = 1.25;
    boardObjectsArr[19].dy2 = 1.25;
    boardObjectsArr[19].dx1 = -3;
    boardObjectsArr[19].dx2 = -3;
    for(var i=0,len=hostageLineObjects.length;i<len;i++){
      hostageLineObjects[i].dx1 = -3;
      hostageLineObjects[i].dx2 = -3;
      hostageLineObjects[i].dy1 = 1.25;
      hostageLineObjects[i].dy2 = 1.25;
    }
    for(var i=0,len=hostageRoundObjects.length;i<len;i++){
      hostageRoundObjects[i].dx = -3;
      hostageRoundObjects[i].dy = 1.25;
    }
  }
  function structureHit3(){
    boardObjectsArr[2].dy1 = 10;
    boardObjectsArr[2].dx1 = -3;
    boardObjectsArr[3].dx1 = 12;
    boardObjectsArr[3].dy1 = 10;
    boardObjectsArr[12].dy1 = 10;
    boardObjectsArr[12].dx1 = 12;
    boardObjectsArr[4].dy1 = 10;
    boardObjectsArr[4].dy2 = 8;
    boardObjectsArr[5].dy1 = 11;
    boardObjectsArr[5].dy2 = 6;
    boardObjectsArr[7].dy1 = 12;
    boardObjectsArr[7].dy2 = 12;
    boardObjectsArr[9].dy1 = 12;
    boardObjectsArr[9].dy2 = 12;
    boardObjectsArr[10].dy1 = 12;
    boardObjectsArr[10].dy2 = 12;
    boardObjectsArr[11].dy1 = 20;
    boardObjectsArr[11].dy2 = 10;
    boardObjectsArr[11].dx1 = 21;
    boardObjectsArr[13].dy2 = 11;
    boardObjectsArr[13].dy1 = 20;
    boardObjectsArr[13].dx1 = 12;
    boardObjectsArr[14].dy2 = 20;
    boardObjectsArr[14].dy1 = 20;
    boardObjectsArr[15].dy2 = 21;
    boardObjectsArr[15].dy1 = 21;
    boardObjectsArr[16].dy2 = 21;
    boardObjectsArr[16].dy1 = 21;
    boardObjectsArr[16].dx2 = 4;
    boardObjectsArr[17].dy2 = 21;
    boardObjectsArr[17].dy1 = 21;
    boardObjectsArr[17].dx1 = -4;
    boardObjectsArr[17].dx2 = -4;
    boardObjectsArr[18].dx2 = 10;
    boardObjectsArr[19].dx1 = -4;
    boardObjectsArr[19].dx2 = -4;
    boardObjectsArr[19].dy1 = 42;
    boardObjectsArr[19].dy2 = 44;
    boardObjectsArr[18].dy1 = 30;
    boardObjectsArr[18].dy2 = 30;
  }
  function structureHitTop1(){
    boardObjectsArr[18].dx2 = -3;
    boardObjectsArr[19].dx1 = -3;
    boardObjectsArr[19].dx2 = -3;
    for(var i=0,len=hostageLineObjects.length;i<len;i++){
      hostageLineObjects[i].dx1 = -3;
      hostageLineObjects[i].dx2 = -3;
    }
    for(var i=0,len=hostageRoundObjects.length;i<len;i++){
      hostageRoundObjects[i].dx = -3;
    }
    if(boardObjectsArr[18].x2 < 892){
      boardReset();
      structure.hit = 1.1;
    }
  }
  function structureHitTop2(){
    boardObjectsArr[18].dx2 = 10;
    boardObjectsArr[19].dx1 = 10;
    boardObjectsArr[19].dx2 = 10;
    for(var i=0,len=hostageLineObjects.length;i<len;i++){
      hostageLineObjects[i].dx1 = 10;
      hostageLineObjects[i].dx2 = 10;
    }
    for(var i=0,len=hostageRoundObjects.length;i<len;i++){
      hostageRoundObjects[i].dx = 10;
    }
    if(boardObjectsArr[19].x1 > 890){
      boardReset();
      structure.hit = 2.2;
    }
  }
  function princessFalling(){
    for(var i=0,len=hostageLineObjects.length;i<len;i++){
      hostageLineObjects[i].dy1 = 5;
      hostageLineObjects[i].dy2 = 5;
    }
    for(var i=0,len=hostageRoundObjects.length;i<len;i++){
      hostageRoundObjects[i].dy = 5;
    }
    
    if(hostageLineObjects[0].y1 > 315){
      createBlood(bloodEleArr,bloodObjArr,921,346)
      bloodExplosion(bloodObjArr)
      explodeHostage();
      setTimeout(hostageInjuredText,2500);
      setTimeout(again,6000,'Try Again?',100);
      structure.hit = 'done';
    }
  }
  // createTextElement(x,y,fontSize,textAnchor,opacity,color,text,fontFamily)
  function hostageInjuredText(){
    var princessInjured = createTextElement(205,230,35,'center',1,'red','The Princess has been fatally injured!','hotel-open');
    hostageStuff.status = 'gone';
  }
  
  function savedPrincessText(){
    var princessSaved = createTextElement(350,280,35,'center',1,'red','You Saved the Princess!','hotel-open');
  }

  function again(text,width){
    // createEllipseElement(cx,cy,rx,ry,color,opacity,stroke)
    // var tryAgainEllipse = createEllipseElement(550,325,50,25,'#BD2C06',1,'white');
    var tryAgainRect = createRectElement(width,40,510,300,1,'red',10,'white');
    // var red  = createRectElement(130,40,55,455,1,'red',10,'white');
    var tryAgainText = createTextElement(515,327.5,16,'center',1,'white',text,'hotel-open');
    var clearTryAgainEllipse = createEllipseElement(550,325,50,25,'red',0);
    clearTryAgainEllipse.onclick = function(){
      window.location.reload();
    };
    hostageStuff.status = 'gone';
  }
 
  // <ellipse id='startEllipse' cx='550' cy='240' fill='red' rx='50' ry='25' stroke='white'/>
  // <text id='start' x='515' y='245' fill='white' font-size='13' font-family='hotel-open' >Start Game</text>
  // <ellipse id='clearStartEllipse' cx='550' cy='240' fill='red' rx='50' ry='25' opacity='0' stroke='white'/>
  function boardReset(){
    for(var i=0,len=boardObjectsArr.length;i<len;i++){
        boardObjectsArr[i].dx1 = 0;
        boardObjectsArr[i].dx2 = 0;
        boardObjectsArr[i].dy1 = 0;
        boardObjectsArr[i].dy2 = 0;
      }
    for(var i=0,len=hostageLineObjects.length;i<len;i++){
      hostageLineObjects[i].dx1 = 0;
      hostageLineObjects[i].dx2 = 0;
      hostageLineObjects[i].dy1 = 0;
      hostageLineObjects[i].dy2 = 0;
    }
    for(var i=0,len=hostageRoundObjects.length;i<len;i++){
      hostageRoundObjects[i].dx = 0;
      hostageRoundObjects[i].dy = 0;
    }
  }
  function resetBadGuy(badGuyLineObjects,badGuyRoundObjects){
    for(var i=0,len=badGuyLineObjects.length;i<len;i++){
      badGuyLineObjects[i].dx1 = 0;
      badGuyLineObjects[i].dx2 = 0;
      badGuyLineObjects[i].dy1 = 0;
      badGuyLineObjects[i].dy2 = 0;
    }
    for(var i=0,len=badGuyRoundObjects.length;i<len;i++){
      badGuyRoundObjects[i].dx = 0;
      badGuyRoundObjects[i].dy = 0;
    }
  }

  var trampoline1Leg1Ele = createLineElement(690,690,525,545,2,'black');
  var trampoline1Leg2Ele = createLineElement(725,725,535,555,2,'black');
  var trampoline1Leg3Ele = createLineElement(760,760,525,545,2,'black');
  var trampoline1Ele = createEllipseElement(725,525,40,10,'#4C4E4B',1,'blue');
  var trampoline2Leg1Ele = createLineElement(520,520,525,545,2,'black');
  var trampoline2Leg2Ele = createLineElement(555,555,535,555,2,'black');
  var trampoline2Leg3Ele = createLineElement(590,590,525,545,2,'black');
  var trampoline2Ele = createEllipseElement(555,525,40,10,'#4C4E4B',1,'blue');
  var trampoline3Leg1Ele = createLineElement(350,350,525,545,2,'black');
  var trampoline3Leg2Ele = createLineElement(385,385,535,555,2,'black');
  var trampoline3Leg3Ele = createLineElement(420,420,525,545,2,'black');
  var trampoline3Ele = createEllipseElement(385,525,40,10,'#4C4E4B',1,'blue');
  // Begin of Weapon Weapon Weapon ///////////
  
  function fireBall(){
    ballObjects[weapon.whichBall].dx = 10;
    
  }
  var smallBallEleArr = [];
  var smallBallObjArr = [];
  function buildSmallBalls(){
    for(var i=0;i<25;i++){
      smallBallEleArr[i] = createEllipseElement(816,500,3,3,'white');
    }
    for(var i=0;i<25;i++){
      smallBallObjArr[i] = createEllipseObj(smallBallEleArr[i]);
    }
  }

  function ballExplode(){
    var x;
    var y;
    for(var i=0;i<25;i++){
      if(Math.random() > 0.5){
        x = 20;
      }
      else{
        x = -20;
      }
      if(Math.random() < 0.5){
        y = 20;
      }
      else{
        y = -20;
      }
      smallBallObjArr[i].dx = x * Math.random();
      smallBallObjArr[i].dy = y * Math.random();
    }
  }
  function removeBall(){
    ballEleArr[0].remove();
    ballEleArr.shift();
    
  }
  function removeSmallBalls(){
    for(var i=0;i<smallBallEleArr.length;i++){
      smallBallEleArr[i].remove();
    }
  }
  
 
  
  function trigger(){
    var clearTrigger  = createRectElement(150,55,45,496,0,'#284F23',10);
    clearTrigger.onclick = function(){
      fireBall();
    }
  }
  // createRectElement(width,height,x,y,opacity,fill,rx)
  // createBallElement(cx,cy,r,color)
  
  var pipe = createRectElement(150,35,100,441.5,1,'#92BCC8',14);
  var pipe2 = createRectElement(35,85,100,441.5,1,'#92BCC8',5);
  
  var heroStep = createRectElement(55,67.5,45.5,461.5,1,'#284F23',0);
  
  var capOfGun = createEllipseElement(238,460,12,18,'white',0.25,'black');
  var ball1 = createBallElement(240,460,12.5,'white');
  var ball2 = createBallElement(210,460,12.5,'white');
  var ball3 = createBallElement(180,460,12.5,'white');
  var ball4 = createBallElement(150,460,12.5,'white');
  var ball5 = createBallElement(120,460,12.5,'white');
  var ball6 = createBallElement(120,490,12.5,'white');
  var triggerColor2  = createRectElement(150,55,45,496,1,'#284F23',10);
  var red  = createRectElement(130,40,55,505,1,'red',10,'white');
  // var red  = createEllipseElement(125,525,55,17.5,'#BD2C06',1,'white');
  var push = createTextElement(81.5,535,28,'center',1,'white','Push','hotel-open');
  trigger();
  weapon.whichBall = 0;
  var ball1Obj = createBallObj(ball1);
  var ball2Obj = createBallObj(ball2);
  var ball3Obj = createBallObj(ball3);
  var ball4Obj = createBallObj(ball4);
  var ball5Obj = createBallObj(ball5);
  var ball6Obj = createBallObj(ball6);
  var ballObjects = [ball1Obj,ball2Obj,ball3Obj,ball4Obj,ball5Obj,ball6Obj];
  var ballEleArr = [ball1,ball2,ball3,ball4,ball5,ball6];
  
  // End of Weapon Weapon Weapon 
  // HERO 
  var hero = {};
  var heroStuff = {};
  heroStuff.bloodEleArr = [];
  heroStuff.bloodObjArr = [];
  heroStuff.status = 'alive';
  hero.torso1Ele = createLineElement(47,101,427.5,427.5,18,'#BD2C06');
  hero.torso2Ele = createLineElement(56,92,447.5,447.5,30,'#BD2C06');
  hero.headEle = createBallElement(75,410,25,'#FFE1CE');
  hero.leftEyeEle = createEllipseElement(68,407,8,10,'white');
  hero.rightEyeEle = createEllipseElement(82,407,8,10,'white');
  hero.leftEyeColorEle = createEllipseElement(70,407,1.5,1.5,'#1E181A');
  hero.rightEyeColorEle = createEllipseElement(85,407,1.5,1.5,'#1E181A');
  hero.mouthEle = createEllipseElement(75,422,4,4,'#1E181A');
  hero.hair1Ele = createLineElement(55,50,388,418,7,'#D1A967');
  hero.hair2Ele = createLineElement(55,100,388,384,12,'#D1A967');

  var heroHeadObj = createBallObj(hero.headEle);
  var heroLeftEyeObj = createEllipseObj(hero.leftEyeEle);
  var heroRightEyeObj = createEllipseObj(hero.rightEyeEle);
  var heroLeftEyeColorObj = createEllipseObj(hero.leftEyeColorEle);
  var heroRightEyeColorObj = createEllipseObj(hero.rightEyeColorEle);
  var heroMouthObj = createEllipseObj(hero.mouthEle)
  var heroTorso1Obj = createLineObject(hero.torso1Ele);
  var heroTorso2Obj = createLineObject(hero.torso2Ele);
  var heroHair1Obj = createLineObject(hero.hair1Ele);
  var heroHair2Obj = createLineObject(hero.hair2Ele);
  
  var heroRoundObjects = [heroMouthObj,heroLeftEyeColorObj,heroRightEyeColorObj,heroHeadObj,heroLeftEyeObj,heroRightEyeObj];

  var heroLineObjects = [heroHair2Obj,heroHair1Obj,heroTorso2Obj,heroTorso1Obj];
  
  // // End HERO 
  // Begin BadGuy Number 1 
  var badGuys = {};
  var bG1 = {};
 
  badGuys.bloodEleArr = [];
  badGuys.bloodObjArr = [];
  var bG1Objects = {};
  function createbG1(){
    bG1.torso1Ele = createLineElement(700,754,100,100,18,'#DE5D25');
    bG1.torso2Ele = createLineElement(710,744,120,120.5,30,'#DE5D25');
    bG1.headEle = createBallElement(727.5,80,27,'#FFE1CE');
    bG1.leftEyeEle = createEllipseElement(721,78,8,10,'white');
    bG1.rightEyeEle = createEllipseElement(734,78,8,10,'white');
    bG1.leftEyeColorEle = createEllipseElement(717,78,1.5,1.5,'red');
    bG1.rightEyeColorEle = createEllipseElement(731,78,1.5,1.5,'red');
    bG1.hair1Ele = createLineElement(705,700,65,95,7,'#F1EFBE');
    bG1.hair2Ele = createLineElement(705,745,60,56,12,'#F1EFBE');
    bG1.hair3Ele = createLineElement(750,755,62,92,7,'#F1EFBE');
    bG1.mouthEle = createEllipseElement(728,96,4,4,'#1E181A');
    bG1.rightEyeBrowEle = createLineElement(714,725,61,68,1.5,'black');
    bG1.leftEyeBrowEle = createLineElement(727,738,68,57,1.5,'black');
    bG1Objects.bG1HeadObj = createBallObj(bG1.headEle);
    bG1Objects.bG1LeftEyeObj = createEllipseObj(bG1.leftEyeEle);
    bG1Objects.bG1RightEyeObj = createEllipseObj(bG1.rightEyeEle);
    bG1Objects.bG1LeftEyeColorObj = createEllipseObj(bG1.leftEyeColorEle);
    bG1Objects.bG1RightEyeColorObj = createEllipseObj(bG1.rightEyeColorEle);
    bG1Objects.bG1MouthObj = createEllipseObj(bG1.mouthEle);
    bG1Objects.bG1Torso1Obj = createLineObject(bG1.torso1Ele);
    bG1Objects.bG1Torso2Obj = createLineObject(bG1.torso2Ele);
    bG1Objects.bG1Hair1Obj = createLineObject(bG1.hair1Ele);
    bG1Objects.bG1Hair2Obj = createLineObject(bG1.hair2Ele);
    bG1Objects.bG1Hair1Obj = createLineObject(bG1.hair1Ele);
    bG1Objects.bG1Hair2Obj = createLineObject(bG1.hair2Ele);
    bG1Objects.bG1Hair3Obj = createLineObject(bG1.hair3Ele);
    bG1Objects.bG1RightEyeBrowObj = createLineObject(bG1.leftEyeBrowEle);
    bG1Objects.bG1LeftEyeBrowObj = createLineObject(bG1.rightEyeBrowEle);
    badGuys.status = 'one';
  }
  createbG1()
  // console.log(bG1Objects.bG1HeadObj.cx);
  
  var bG2 = {};
  var bG2Objects = {};
  var bG2Stuff = {};
  bG2Stuff.bloodEleArr = [];
  bG2Stuff.bloodObjArr = [];
  function createbG2(){
    bG2.torso1Ele = createLineElement(700,754,100,100,18,'#3B016A');
    bG2.torso2Ele = createLineElement(710,744,120,120.5,30,'#3B016A');
    bG2.headEle = createBallElement(727.5,82,27,'#FFE1CE');
    bG2.leftEyeEle = createEllipseElement(721,78,8,10,'white');
    bG2.rightEyeEle = createEllipseElement(734,78,9,11,'white');
    bG2.leftEyeColorEle = createEllipseElement(717,78,2,2,'red');
    bG2.rightEyeColorEle = createEllipseElement(731,78,2,2,'red');
    bG2.hair1Ele = createLineElement(705,700,65,95,7,'black');
    bG2.hair2Ele = createLineElement(705,747,60,56,12,'black');
    bG2.hair3Ele = createLineElement(750,755,60,92,7,'black');
    bG2.mouthEle = createEllipseElement(728,96,4,4,'#1E181A');
    bG2.rightEyeBrowEle = createLineElement(714,725,64,71,1.5,'black');
    bG2.leftEyeBrowEle = createLineElement(727,738,71,60,1.5,'black');
    bG2Objects.HeadObj = createBallObj(bG2.headEle);
    bG2Objects.LeftEyeObj = createEllipseObj(bG2.leftEyeEle);
    bG2Objects.RightEyeObj = createEllipseObj(bG2.rightEyeEle);
    bG2Objects.LeftEyeColorObj = createEllipseObj(bG2.leftEyeColorEle);
    bG2Objects.RightEyeColorObj = createEllipseObj(bG2.rightEyeColorEle);
    bG2Objects.MouthObj = createEllipseObj(bG2.mouthEle);
    bG2Objects.Torso1Obj = createLineObject(bG2.torso1Ele);
    bG2Objects.Torso2Obj = createLineObject(bG2.torso2Ele);
    bG2Objects.Hair2Obj = createLineObject(bG2.hair2Ele);
    bG2Objects.Hair1Obj = createLineObject(bG2.hair1Ele);
    bG2Objects.Hair3Obj = createLineObject(bG2.hair3Ele);
    bG2Objects.RightEyeBrowObj = createLineObject(bG2.leftEyeBrowEle);
    bG2Objects.LeftEyeBrowObj = createLineObject(bG2.rightEyeBrowEle);
    bG2Objects.lineArr = [bG2Objects.LeftEyeBrowObj,bG2Objects.RightEyeBrowObj,bG2Objects.Hair3Obj,bG2Objects.Torso1Obj,bG2Objects.Torso2Obj,bG2Objects.Hair2Obj,bG2Objects.Hair1Obj];
    bG2Objects.roundArr = [bG2Objects.HeadObj,bG2Objects.LeftEyeObj,bG2Objects.RightEyeObj,bG2Objects.LeftEyeColorObj,bG2Objects.RightEyeColorObj,bG2Objects.MouthObj];
    badGuys.status = 'two';
  }

  var bG3 = {};
  var bG3Objects = {};
  var bG3Stuff = {};
  bG3Stuff.bloodEleArr = [];
  bG3Stuff.bloodObjArr = [];
  function createbG3(){
    bG3.torso1Ele = createLineElement(1000,1054,100,100,18,'black');
    bG3.torso2Ele = createLineElement(1010,1044,120,120.5,30,'black');
    bG3.headEle = createBallElement(1027.5,82,27,'#FFE1CE');
    bG3.leftEyeEle = createEllipseElement(1021,78,8,10,'white');
    bG3.rightEyeEle = createEllipseElement(1034,78,9,11,'white');
    bG3.leftEyeColorEle = createEllipseElement(1017,78,2,2,'red');
    bG3.rightEyeColorEle = createEllipseElement(1031,78,2,2,'red');
    bG3.hair1Ele = createLineElement(1005,1000,65,95,7,'red');
    bG3.hair2Ele = createLineElement(1005,1047,60,56,12,'red');
    bG3.hair3Ele = createLineElement(1050,1055,60,92,7,'red');
    bG3.mouthEle = createEllipseElement(1024,96,4,4,'#1E181A');
    bG3.rightEyeBrowEle = createLineElement(1014,1025,64,71,1.5,'black');
    bG3.leftEyeBrowEle = createLineElement(1027,1038,71,60,1.5,'black');
    bG3Objects.HeadObj = createBallObj(bG3.headEle);
    bG3Objects.LeftEyeObj = createEllipseObj(bG3.leftEyeEle);
    bG3Objects.RightEyeObj = createEllipseObj(bG3.rightEyeEle);
    bG3Objects.LeftEyeColorObj = createEllipseObj(bG3.leftEyeColorEle);
    bG3Objects.RightEyeColorObj = createEllipseObj(bG3.rightEyeColorEle);
    bG3Objects.MouthObj = createEllipseObj(bG3.mouthEle);
    bG3Objects.Torso1Obj = createLineObject(bG3.torso1Ele);
    bG3Objects.Torso2Obj = createLineObject(bG3.torso2Ele);
    bG3Objects.Hair2Obj = createLineObject(bG3.hair2Ele);
    bG3Objects.Hair1Obj = createLineObject(bG3.hair1Ele);
    bG3Objects.Hair3Obj = createLineObject(bG3.hair3Ele);
    bG3Objects.RightEyeBrowObj = createLineObject(bG3.leftEyeBrowEle);
    bG3Objects.LeftEyeBrowObj = createLineObject(bG3.rightEyeBrowEle);
    bG3Objects.lineArr = [bG3Objects.LeftEyeBrowObj,bG3Objects.RightEyeBrowObj,bG3Objects.Hair3Obj,bG3Objects.Torso1Obj,bG3Objects.Torso2Obj,bG3Objects.Hair2Obj,bG3Objects.Hair1Obj];
    bG3Objects.roundArr = [bG3Objects.HeadObj,bG3Objects.LeftEyeObj,bG3Objects.RightEyeObj,bG3Objects.LeftEyeColorObj,bG3Objects.RightEyeColorObj,bG3Objects.MouthObj];
    badGuys.status = 'three';
  }
  


  function explode(roundObjects,lineObjects,person){
    var x;
    for(var i=0,len=roundObjects.length;i<len;i++){
      if(Math.random() > 0.5){
        x = 14;
      }
      else{
        x = -14;
      }
      roundObjects[i].dx = x * Math.random();
      roundObjects[i].dy = x * Math.random();
    }
    for(var i=0,len=lineObjects.length;i<len;i++){
      if(Math.random() > 0.5){
        x = 100 * Math.random();
      }
      else{
        x = -100 * Math.random();
      }
      lineObjects[i].dx1 = x;
      lineObjects[i].dx2 = x;
    }
    setTimeout(remove,2500,person,badGuys.bloodEleArr,badGuys.bloodObjArr);

  }
  

  function remove(person,eleArr,objArr){
    for(var key in person){
      person[key].remove();
    }
    
    for(var i=0,len=eleArr.length;i<len;i++){
      eleArr[i].remove();
    }
    badGuys.bloodObjArr = [];
    if(badGuys.status === 'oneDead'){
      createbG2();
    }
    if(badGuys.status === 'twoDead'){
      createbG3();
    }
  }

  var move1 = {};
  move1.badDir = 'down';
  move1.ySpeed = 4;
  move1.xSpeed = 0;
  move1.jump = 0;
  function bG1Movement(){
    if(bG1RoundObjects[0].cy > 470 && move1.badDir === 'down'){
      move1.ySpeed *= -1;
      move1.badDir = 'up'
      move1.jump++;
    }

    if(move1.jump === 2){
      move1.xSpeed = -6;
    }
    if(bG1RoundObjects[0].cx < 560){
      move1.xSpeed = 0;
    }
    if(move1.jump === 4){
      move1.xSpeed = -6;
    }
    if(bG1RoundObjects[0].cx < 390){
      move1.xSpeed = 0;
    }
    if(move1.jump === 6 && bG1RoundObjects[0].cx < 75){
      move1.xSpeed = -8;
      if(bG1RoundObjects[0].cy > 397){
        badGuys.status = 'won';
        setTimeout(movebG1Eyes,1000);
        resetBadGuy(bG1LineObjects,bG1RoundObjects);
        
        createBlood(badGuys.bloodEleArr,badGuys.bloodObjArr,70,427);
        bloodExplosion(badGuys.bloodObjArr);
        explode(heroRoundObjects,heroLineObjects,hero);
        heroStuff.status = 'inTrouble';
        
        setTimeout(fireBall,1600);
        setTimeout(fireBall,2800);
        setTimeout(fireBall,4100);
        return;
      }
    }
    if(move1.jump === 6){
      move1.xSpeed = -8;
      
    }
    if(bG1RoundObjects[0].cx < 75){
      move1.xSpeed = 0;
    }
    if(bG1RoundObjects[0].cy > 120 ){
      move1.ySpeed += 0.25;
    }
    if(bG1RoundObjects[0].cy > 400 ){
      move1.ySpeed -= 0.25;
    }
    if(move1.jump === 7){
      
    }
    if(bG1RoundObjects[0].cy < 170 && move1.badDir === 'up'){
      move1.ySpeed *= -1;
      move1.ySpeed += 0.25;
      move1.badDir = 'down'
    }
    for(var i=0,len=bG1RoundObjects.length;i<len;i++){
      bG1RoundObjects[i].dy = move1.ySpeed;
      bG1RoundObjects[i].dx = move1.xSpeed;
    }
    for(var i=0,len=bG1LineObjects.length;i<len;i++){
      bG1LineObjects[i].dy1 = move1.ySpeed;
      bG1LineObjects[i].dy2 = move1.ySpeed;
      bG1LineObjects[i].dx1 = move1.xSpeed;
      bG1LineObjects[i].dx2 = move1.xSpeed;
    }
  }
  var move2 = {};
  move2.badDir = 'down';
  move2.ySpeed = 3;
  move2.xSpeed = 0;
  move2.jump = 0;
  function bG2Movement(){
    if(bG2Objects.roundArr[0].cy > 470 && move2.badDir === 'down'){
      move2.ySpeed *= -1; 
      move2.badDir = 'up'
      move2.jump++;
    }
    if(move2.jump === 2){
      move2.xSpeed = -6;
    }
    if(bG2Objects.roundArr[0].cx < 560 && move2.jump === 2){
      move2.xSpeed = 0;
    }
    if(move2.jump === 4){
      move2.xSpeed = -5;
    }
    if(move2.jump === 4 && bG2Objects.roundArr[0].cx < 75){
      move2.xSpeed = -1;
      if(bG2Objects.roundArr[0].cy > 402){
        badGuys.status = 'won';
        setTimeout(movebG2Eyes,1000);
        resetBadGuy(bG2Objects.lineArr,bG2Objects.roundArr);
        createBlood(badGuys.bloodEleArr,badGuys.bloodObjArr,70,427);
        bloodExplosion(badGuys.bloodObjArr);
        explode(heroRoundObjects,heroLineObjects,hero);
        heroStuff.status = 'inTrouble';
        setTimeout(fireBall,1600);
        setTimeout(fireBall,2800);
        setTimeout(fireBall,4100);
        return;
      }
    }
    if(bG2Objects.roundArr[0].cy > 140 ){
      move2.ySpeed += 0.25;
    }
    if(bG2Objects.roundArr[0].cy > 400 ){
      move2.ySpeed -= 0.25;
    }
    
    if(bG2Objects.roundArr[0].cy < 80 && move2.badDir === 'up'){
      move2.ySpeed *= -1;
      move2.ySpeed += 0.25;
      move2.badDir = 'down'
    }
    for(var i=0,len=bG2Objects.roundArr.length;i<len;i++){
      bG2Objects.roundArr[i].dy = move2.ySpeed;
      bG2Objects.roundArr[i].dx = move2.xSpeed;
    }
    for(var i=0,len=bG2Objects.lineArr.length;i<len;i++){
      bG2Objects.lineArr[i].dy1 = move2.ySpeed;
      bG2Objects.lineArr[i].dy2 = move2.ySpeed;
      bG2Objects.lineArr[i].dx1 = move2.xSpeed;
      bG2Objects.lineArr[i].dx2 = move2.xSpeed;
    }
  }
  var move3 = {};
  move3.badDir = 'up';
  move3.ySpeed = -3;
  move3.xSpeed = 0;
  move3.jump = 0;
  function bG3Movement(){
    if(bG3Objects.roundArr[0].cx > 950 && move3.badDir === 'up' && move3.jump === 0){
      move3.xSpeed = -6.5;
    }
    if(bG3Objects.roundArr[0].cx < 800 && move3.badDir === 'up'&& move3.jump === 0){
      move3.ySpeed = 15;
    }
    
    if(bG3Objects.roundArr[0].cx < 75){
      move3.xSpeed = -0.5;
      if(bG3Objects.roundArr[0].cy > 402){
        badGuys.status = 'won';
        setTimeout(movebG3Eyes,1000);
        resetBadGuy(bG3Objects.lineArr,bG3Objects.roundArr);
        createBlood(badGuys.bloodEleArr,badGuys.bloodObjArr,70,427);
        bloodExplosion(badGuys.bloodObjArr);
        explode(heroRoundObjects,heroLineObjects,hero);
        heroStuff.status = 'inTrouble';
        setTimeout(fireBall,1600);
        setTimeout(fireBall,2800);
        setTimeout(fireBall,4100);
        return;
      }
    }
    
    if(bG3Objects.roundArr[0].cy > 480 && move3.badDir === 'up'){
      move3.ySpeed *= -1;
      move3.badDir = 'down';
      // explode trampoline here!
      move3.jump++
    }
    if(move3.jump === 1 && bG3Objects.roundArr[0].cx < 270){
      move3.ySpeed *= -1;
      move3.jump++;
    }
    for(var i=0,len=bG3Objects.roundArr.length;i<len;i++){
      bG3Objects.roundArr[i].dy = move3.ySpeed;
      bG3Objects.roundArr[i].dx = move3.xSpeed;
    }
    for(var i=0,len=bG3Objects.lineArr.length;i<len;i++){
      bG3Objects.lineArr[i].dy1 = move3.ySpeed;
      bG3Objects.lineArr[i].dy2 = move3.ySpeed;
      bG3Objects.lineArr[i].dx1 = move3.xSpeed;
      bG3Objects.lineArr[i].dx2 = move3.xSpeed;
    }
  }
  function movebG1Eyes(){
    bG1Objects.bG1LeftEyeColorObj.cx += 7;
    bG1Objects.bG1RightEyeColorObj.cx += 7;
  }
  function movebG2Eyes(){
    bG2Objects.LeftEyeColorObj.cx += 7;
    bG2Objects.RightEyeColorObj.cx += 7;
  }
  function movebG3Eyes(){
    bG3Objects.LeftEyeColorObj.cx += 7;
    bG3Objects.RightEyeColorObj.cx += 7;
  }


  

  var bG1LineObjects = [bG1Objects.bG1LeftEyeBrowObj,bG1Objects.bG1RightEyeBrowObj,bG1Objects.bG1Hair3Obj,bG1Objects.bG1Torso1Obj,bG1Objects.bG1Torso2Obj,bG1Objects.bG1Hair1Obj,bG1Objects.bG1Hair2Obj];
  var bG1RoundObjects = [bG1Objects.bG1HeadObj,bG1Objects.bG1LeftEyeObj,bG1Objects.bG1RightEyeObj,bG1Objects.bG1LeftEyeColorObj,bG1Objects.bG1RightEyeColorObj,bG1Objects.bG1MouthObj];
  
  

  // BadGuy Number 1 
  structure.hit = 0;

  var viewWidth = view.width;
  var viewHeight = view.height;
  
  function collideBallWith(ball,head,func) {
    if(ball.bottom != undefined){
      if(ball.bottom > head.top && ball.top < head.bottom &&
         ball.right > head.left && ball.left < head.right) {
        if(badGuys.status === 'one'){
          resetBadGuy(bG1LineObjects,bG1RoundObjects);
          createBlood(badGuys.bloodEleArr,badGuys.bloodObjArr,bG1Objects.bG1HeadObj.cx,bG1Objects.bG1HeadObj.cy);
          bloodExplosion(badGuys.bloodObjArr);
          explode(bG1RoundObjects,bG1LineObjects,bG1);
          badGuys.status = 'oneDead';
          ballObjects.splice(weapon.whichBall,1);
          removeBall();
        }
        if(badGuys.status === 'two'){
          resetBadGuy(bG2Objects.lineArr,bG2Objects.roundArr);
          createBlood(badGuys.bloodEleArr,badGuys.bloodObjArr,bG2Objects.HeadObj.cx,bG2Objects.HeadObj.cy);
          bloodExplosion(badGuys.bloodObjArr);
          explode(bG2Objects.roundArr,bG2Objects.lineArr,bG2);
          badGuys.status = 'twoDead';
          ballObjects.splice(weapon.whichBall,1);
          removeBall();
        }
        if(badGuys.status === 'three'){
          resetBadGuy(bG3Objects.lineArr,bG3Objects.roundArr);
          createBlood(badGuys.bloodEleArr,badGuys.bloodObjArr,bG3Objects.HeadObj.cx,bG3Objects.HeadObj.cy);
          bloodExplosion(badGuys.bloodObjArr);
          explode(bG3Objects.roundArr,bG3Objects.lineArr,bG3);
          badGuys.status = 'threeAlmostDead';
          ballObjects.splice(weapon.whichBall,1);
          removeBall();
        }
        for(i=0,len=ballObjects.length;i<len;i++){
          if(i <= 3){
            ballObjects[i].cx += 30;
          }
          if(i == 4){
            ballObjects[i].cy -= 30
          }
        }
      } 
    } 
   }
  badGuys.status = 'one';
  var animate = function(){
    if(hostageStuff.status != 'gone'){
      if(badGuys.status === 'threeAlmostDead'){
        setTimeout(savedPrincessText,2500);
        setTimeout(again,2500,'Play Again?',115);
        badGuys.status = 'threeDead';
      }
      if(heroStuff.status === 'inTrouble'){
        for(var i=0,len=heroRoundObjects.length;i<len;i++){
          heroRoundObjects[i].cx += heroRoundObjects[i].dx;
          heroRoundObjects[i].cy += heroRoundObjects[i].dy;
        }
        for(var i=0,len=heroLineObjects.length;i<len;i++){
          heroLineObjects[i].x1 += heroLineObjects[i].dx1;
          heroLineObjects[i].x2 += heroLineObjects[i].dx2;
          heroLineObjects[i].y1 += heroLineObjects[i].dy1;
          heroLineObjects[i].y2 += heroLineObjects[i].dy2;
        }
      }
      
      if(badGuys.status === 'one' || badGuys.status === 'oneDead'){
        for(var i=0,len=bG1RoundObjects.length;i<len;i++){
          bG1RoundObjects[i].cx += bG1RoundObjects[i].dx;
          bG1RoundObjects[i].cy += bG1RoundObjects[i].dy;
        }
        for(var i=0,len=bG1LineObjects.length;i<len;i++){
          bG1LineObjects[i].x1 += bG1LineObjects[i].dx1;
          bG1LineObjects[i].x2 += bG1LineObjects[i].dx2;
          bG1LineObjects[i].y1 += bG1LineObjects[i].dy1;
          bG1LineObjects[i].y2 += bG1LineObjects[i].dy2;
        }
      }
      
      if(badGuys.status === 'two' || badGuys.status === 'twoDead'){
        
        for(var i=0,len=bG2Objects.roundArr.length;i<len;i++){
          bG2Objects.roundArr[i].cx += bG2Objects.roundArr[i].dx;
          bG2Objects.roundArr[i].cy += bG2Objects.roundArr[i].dy;
        }
        for(var i=0,len=bG2Objects.lineArr.length;i<len;i++){
          bG2Objects.lineArr[i].x1 += bG2Objects.lineArr[i].dx1;
          bG2Objects.lineArr[i].x2 += bG2Objects.lineArr[i].dx2;
          bG2Objects.lineArr[i].y1 += bG2Objects.lineArr[i].dy1;
          bG2Objects.lineArr[i].y2 += bG2Objects.lineArr[i].dy2;
        }
      }
      if(badGuys.status === 'three' || badGuys.status === 'threeDead'){
        for(var i=0,len=bG3Objects.roundArr.length;i<len;i++){
          bG3Objects.roundArr[i].cx += bG3Objects.roundArr[i].dx;
          bG3Objects.roundArr[i].cy += bG3Objects.roundArr[i].dy;
        }
        for(var i=0,len=bG3Objects.lineArr.length;i<len;i++){
          bG3Objects.lineArr[i].x1 += bG3Objects.lineArr[i].dx1;
          bG3Objects.lineArr[i].x2 += bG3Objects.lineArr[i].dx2;
          bG3Objects.lineArr[i].y1 += bG3Objects.lineArr[i].dy1;
          bG3Objects.lineArr[i].y2 += bG3Objects.lineArr[i].dy2;
        }
      }
      if(badGuys.status === 'one'){
        bG1Movement();
        collideBallWith(ballObjects[0],bG1Objects.bG1HeadObj);
      }
      
      if(badGuys.status === 'two'){
        bG2Movement();
        collideBallWith(ballObjects[0],bG2Objects.HeadObj);
      }
      if(badGuys.status === 'three'){
        bG3Movement();
        collideBallWith(ballObjects[0],bG3Objects.HeadObj);
      }
      for(var i=0,len=hostageRoundObjects.length;i<len;i++){
        hostageRoundObjects[i].cx += hostageRoundObjects[i].dx;
        hostageRoundObjects[i].cy += hostageRoundObjects[i].dy;
      }
      for(var i=0,len=hostageLineObjects.length;i<len;i++){
        hostageLineObjects[i].x1 += hostageLineObjects[i].dx1;
        hostageLineObjects[i].x2 += hostageLineObjects[i].dx2;
        hostageLineObjects[i].y1 += hostageLineObjects[i].dy1;
        hostageLineObjects[i].y2 += hostageLineObjects[i].dy2;
      }
      for(var i=0,len=bloodObjArr.length;i<len;i++){
        bloodObjArr[i].cx += bloodObjArr[i].dx;
        bloodObjArr[i].cy += bloodObjArr[i].dy;
      }
      for(var i=0,len=badGuys.bloodObjArr.length;i<len;i++){
        badGuys.bloodObjArr[i].cx += badGuys.bloodObjArr[i].dx;
        badGuys.bloodObjArr[i].cy += badGuys.bloodObjArr[i].dy;
      }

      for(var i=0;i<smallBallObjArr.length;i++){
        smallBallObjArr[i].cx += smallBallObjArr[i].dx;
        smallBallObjArr[i].cy += smallBallObjArr[i].dy;
      }
      
      for(var i=0,len=boardObjectsArr.length;i<len;i++){
        boardObjectsArr[i].x1 += boardObjectsArr[i].dx1;
        boardObjectsArr[i].x2 += boardObjectsArr[i].dx2;
        boardObjectsArr[i].y1 += boardObjectsArr[i].dy1;
        boardObjectsArr[i].y2 += boardObjectsArr[i].dy2;
      }

      for(var i=0,len=ballObjects.length;i<len;i++){
        ballObjects[i].cx += ballObjects[i].dx;

      }
      if(ballObjects[0] != undefined ){
        if(ballObjects[0].cx > 820){
          structure.hit++;
          buildSmallBalls();
          removeBall();
          ballExplode();
          ballObjects.splice(0,1);
          for(i=0,len=ballObjects.length;i<len;i++){
            if(i <= 3){
              ballObjects[i].cx += 30;
            }
            if(i == 4){
              ballObjects[i].cy -= 30
            }
          }
          setTimeout(removeSmallBalls,500);
        }
      }
      
      if(structure.hit === 1){
        if(boardObjectsArr[0].x1 < 840){
          structureHit1();
        }
        else{
          boardReset();
          structure.hit = 'top1';
        }
      }
      if(structure.hit === 'top1'){
        structureHitTop1();
      }
      if(structure.hit === 2.1){
        if(boardObjectsArr[0].x1 < 940){
          structureHit2();
        }
        else{
          boardReset();
          structure.hit = 'top2';
        }
      }
      if(structure.hit === 'top2'){
        structureHitTop2();
      }
      if(structure.hit === 3.2){
        if(boardObjectsArr[2].y1 < 520){
          structureHit3();
        }
        else{
          boardReset();
          structure.hit = 'pricessFalling';
        }
      }
      if(structure.hit === 'pricessFalling'){
        princessFalling();
      }
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);

};






