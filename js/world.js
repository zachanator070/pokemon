
var objects = {};

// global x/y position of the caracter
var xpos = 0;
var ypos = 0;

// map offsets in pixels
var leftOffSet = 231;
var topOffSet = 246;

var moving = false;

var transitionTime = 500;
var worldMoveDelta = 55;

var intervalId;

var keyDown = false;

// array of divs in the screen that need to be moved each key press
var visibleObjects = [];

var world = {
  "2,0":{
    name: 'tree'
  },
  "2,1":{
    name: 'tree'
  },
  "2,2":{
    name: 'tree'
  },
  "1,2":{
    name: 'tree'
  },
  "0,2":{
    name:'tree'
  },
  "1,1":{
    name: 'character',
    image: 'images/oak.png',
    onz: function(){
      console.log('person was called');
    }
  }
};

// moving map functions
var moveworldright = function(){

  var nextPos = (xpos+1) + ","+ypos;

  if(!world.hasOwnProperty(nextPos) && xpos+1 < 500){
    leftOffSet -= worldMoveDelta;
    xpos++;
    console.log('moving right :'+leftOffSet+ " : "+topOffSet);

    moving = true;

    $( "#screen" ).animate({
      "backgroundPositionX" : leftOffSet,
      "backgroundPositionY" : topOffSet
    }, transitionTime, 'linear',function() {
      moving = false;
    });
  }
  else{
    //play some thud sound
  }


};

var moveworldleft = function(){

  var nextPos = (xpos-1) + ","+ypos;

  if(!world.hasOwnProperty(nextPos)  && xpos-1 >= 0){
    leftOffSet += worldMoveDelta;
    xpos--;
    console.log('moving left :'+leftOffSet+ " : "+topOffSet);

    moving = true;

    $( "#screen" ).animate({
      "backgroundPositionX" : leftOffSet,
      "backgroundPositionY" : topOffSet
    }, transitionTime,'linear' , function() {
      moving = false;
    });
  }
};

var moveworldup = function(){

  var nextPos = xpos + ","+(ypos-1);

  if(!world.hasOwnProperty(nextPos) && ypos-1 >= 0){
    ypos--;
    topOffSet += worldMoveDelta;

    console.log('moving up :'+leftOffSet+ " : "+topOffSet);

    moving = true;

    $( "#screen" ).animate({
      "backgroundPositionX" : leftOffSet,
      "backgroundPositionY" : topOffSet
    }, transitionTime, 'linear',function() {
      moving = false;
    });
  }
};

var moveworlddown = function(){

  var nextPos = xpos + ","+(ypos+1);

  if(!world.hasOwnProperty(nextPos) && ypos+1 < 500){
    ypos++;
    topOffSet -= worldMoveDelta;
    console.log('moving down :'+leftOffSet+ " : "+topOffSet);

    moving = true;

    $( "#screen" ).animate({
      "backgroundPositionX" : leftOffSet,
      "backgroundPositionY" : topOffSet
    }, transitionTime, 'linear',function() {
      moving = false;
    });
  }
};

// animation functions
var animation = function(){};

var timer = function(){

  intervalId = setInterval(function(){
      animation();
  },transitionTime);

};

// key down functions
var worldRightKeyDown = function(){

  if(!keyDown && !moving){
    keyDown = true;

    animation = moveworldright;
    animation();
    // make our character have the moving right gif
    timer();

  }

};

var worldLeftKeyDown = function(){

  if(!keyDown && !moving){
    keyDown = true;

    animation = moveworldleft;
    animation();
    // make our character have the moving left gif
    timer();

  }
};

var worldUpKeyDown = function(){

  if(!keyDown && !moving){
    keyDown = true;

    animation = moveworldup;
    animation();
    // make our character have the moving up gif
    timer();
  }
};

var worldDownKeyDown = function(){
  if(!keyDown && !moving){
    keyDown = true;
    animation = moveworlddown;
    animation();
    // make our character have the moving down gif
    timer();
  }
};

var worldzDown = function(){

};

var worldxDown = function(){

};

var worldEnterDown = function(){
  switchToMenuControls();
};

//////////////////////
// Key up functions //
//////////////////////
var worldRightKeyUp = function(){

  keyDown = false;

  clearInterval(intervalId);

  // set our character icon to facing right
};

var worldLeftKeyUp = function(){
  keyDown = false;
  clearInterval(intervalId);

  // set our character icon to facing right
};

var worldUpKeyUp = function(){
  keyDown = false;
  clearInterval(intervalId);

  // set our character icon to facing right
};

var worldDownKeyUp = function(){
  keyDown = false;
  clearInterval(intervalId);

  // set our character icon to facing right
};

var switchToWorldControls = function(){

  resetBindings();

  leftarrowdown = worldLeftKeyDown;
  uparrowdown = worldUpKeyDown;
  downarrowdown = worldDownKeyDown;
  rightarrowdown = worldRightKeyDown;

  xdown = worldxDown;
  zdown = worldzDown;
  enterdown = worldEnterDown;

  leftarrowup = worldLeftKeyUp;
  uparrowup = worldUpKeyUp;
  downarrowup = worldDownKeyUp;
  rightarrowup = worldRightKeyUp;

};
