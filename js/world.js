
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
var lastFacing = 'down';
var nextDirection = null;

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
    $('#character').css({
      "background-image":"url('images/walking\ right.png')"
    });
    $( "#screen" ).animate({
      "backgroundPositionX" : leftOffSet,
      "backgroundPositionY" : topOffSet
    }, transitionTime, 'linear',function() {
      moving = false;
      $('#character').css({
        "background-image":"url('images/right.png')"
      });
      if(nextDirection != null){
        nextDirection();
      }
    });

  }
  else{
    $('#character').css({
      "background-image":"url('images/right.png')"
    });
    var audio = new Audio('sounds/thud.mp3');
    audio.play();
  }

  lastFacing = 'right';

};

var moveworldleft = function(){

  var nextPos = (xpos-1) + ","+ypos;

  if(!world.hasOwnProperty(nextPos)  && xpos-1 >= 0){
    leftOffSet += worldMoveDelta;
    xpos--;
    console.log('moving left :'+leftOffSet+ " : "+topOffSet);

    moving = true;

    $('#character').css({
      "background-image":"url('images/walking\ left.png')"
    });
    $( "#screen" ).animate({
      "backgroundPositionX" : leftOffSet,
      "backgroundPositionY" : topOffSet
    }, transitionTime,'linear' , function() {
      $('#character').css({
        "background-image":"url('images/left.png')"
      });
      moving = false;
      if(nextDirection != null){
        nextDirection();
      }
    });

  }
  else{
    $('#character').css({
      "background-image":"url('images/left.png')"
    });
    var audio = new Audio('sounds/thud.mp3');
    audio.play();
  }
  lastFacing = 'left';
};

var moveworldup = function(){

  var nextPos = xpos + ","+(ypos-1);

  if(!world.hasOwnProperty(nextPos) && ypos-1 >= 0){
    ypos--;
    topOffSet += worldMoveDelta;

    console.log('moving up :'+leftOffSet+ " : "+topOffSet);

    moving = true;
    $('#character').css({
      "background-image":"url('images/walking\ up.png')"
    });
    $( "#screen" ).animate({
      "backgroundPositionX" : leftOffSet,
      "backgroundPositionY" : topOffSet
    }, transitionTime, 'linear',function() {
      moving = false;
      $('#character').css({
        "background-image":"url('images/up.png')"
      });
      if(nextDirection != null){
        nextDirection();
      }
    });


  }
  else{
    $('#character').css({
      "background-image":"url('images/up.png')"
    });
    var audio = new Audio('sounds/thud.mp3');
    audio.play();
  }
  lastFacing = 'up';
};

var moveworlddown = function(){

  var nextPos = xpos + ","+(ypos+1);

  if(!world.hasOwnProperty(nextPos) && ypos+1 < 500){
    ypos++;
    topOffSet -= worldMoveDelta;
    console.log('moving down :'+leftOffSet+ " : "+topOffSet);

    moving = true;
    $('#character').css({
      "background-image":"url('images/walking\ down.png')"
    });
    $( "#screen" ).animate({
      "backgroundPositionX" : leftOffSet,
      "backgroundPositionY" : topOffSet
    }, transitionTime, 'linear',function() {
      moving = false;
      $('#character').css({
        "background-image":"url('images/down.png')"
      });
      if(nextDirection != null){
        nextDirection();
      }
    });

  }
  else{
    $('#character').css({
      "background-image":"url('images/down.png')"
    });
    var audio = new Audio('sounds/thud.mp3');
    audio.play();
  }

  lastFacing = 'down';
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

  if(!moving){
    var objectx = xpos;
    var objecty = ypos;

    if(lastFacing == 'up'){
      objecty--;
    }
    else if(lastFacing == 'down'){
      objecty++;
    }
    else if(lastFacing == 'left'){
      objectx--;
    }
    else if(lastFacing == 'right'){
      objectx++;
    }

    var objectPos = xpos+","+ypos;

    if(world.hasOwnProperty(objectPos)){
      world[objectPos].use();
      var audio = new Audio('sounds/beep.mp3');
      audio.play();
    }

  }


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
