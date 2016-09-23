
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

var doBattle = false;

// array of divs in the screen that need to be moved each key press
var visibleObjects = [];

var world = {
  "3,0":{
    name: 'grass'
  },
  "4,0":{
    name: 'grass'
  },
  "3,1":{
    name: 'grass'
  },
  "4,1":{
    name: 'grass'
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
    use: function(){
      var chat = ['Why you must want to battle some pokemon yes?','Here have one of mine!'];
      switchToChatControls(chat,switchToPickerControls);
      this.use = function(){
        var chat = ['Try walking around in the tall grass'];
        switchToChatControls(chat,switchToWorldControls);
      };
    }
  }
};

function moveInGrass(){

  var nextPos = (xpos+1) + ","+ypos;
  if(world.hasOwnProperty(nextPos)){
    if(world[nextPos].name == "grass"){
      if(Math.random() > .5){
        doBattle = true;
      }
      return true;
    }
  }
  return false;
}

// moving map functions
var moveworldright = function(){

  var nextPos = (xpos+1) + ","+ypos;

  if((moveInGrass() || !world.hasOwnProperty(nextPos)) && xpos+1 < 500){
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
      if(doBattle){
        var max = party[0].level+1;
        var min = party[0].level-3;
        var level = Math.floor(Math.random() * (max - min + 1)) + min;
        max = 150;
        min = 0;
        var number = Math.floor(Math.random() * (max - min + 1)) + min;
        startBattle(generatePokemon(number,level));
        return;
      }

      if(nextDirection != null){
        nextDirection();
      }
      else{
        $('#character').css({
          "background-image":"url('images/right.png')"
        });
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

  if((moveInGrass() || !world.hasOwnProperty(nextPos))  && xpos-1 >= 0){
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

      moving = false;
      if(doBattle){
        var max = party[0].level+1;
        var min = party[0].level-3;
        var level = Math.floor(Math.random() * (max - min + 1)) + min;
        max = 150;
        min = 0;
        var number = Math.floor(Math.random() * (max - min + 1)) + min;
        startBattle(generatePokemon(number,level));
        return;
      }
      if(nextDirection != null){
        nextDirection();
      }
      else{
        $('#character').css({
          "background-image":"url('images/left.png')"
        });
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

  if((moveInGrass() || !world.hasOwnProperty(nextPos)) && ypos-1 >= 0){
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
      if(doBattle){
        var max = party[0].level+1;
        var min = party[0].level-3;
        var level = Math.floor(Math.random() * (max - min + 1)) + min;
        max = 150;
        min = 0;
        var number = Math.floor(Math.random() * (max - min + 1)) + min;
        startBattle(generatePokemon(number,level));
        return;
      }
      if(nextDirection != null){
        nextDirection();
      }
      else{
        $('#character').css({
          "background-image":"url('images/up.png')"
        });
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

  if((moveInGrass() || !world.hasOwnProperty(nextPos)) && ypos+1 < 500){
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
      if(doBattle){
        var max = party[0].level+1;
        var min = party[0].level-3;
        var level = Math.floor(Math.random() * (max - min + 1)) + min;
        max = 150;
        min = 0;
        var number = Math.floor(Math.random() * (max - min + 1)) + min;
        startBattle(generatePokemon(number,level));
        return;
      }
      if(nextDirection != null){
        nextDirection();
      }
      else{
        $('#character').css({
          "background-image":"url('images/down.png')"
        });
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

// key down functions
var worldRightKeyDown = function(){

  if(!keyDown){
    if(!moving){
      moveworldright();
    }

    nextDirection = moveworldright;
    keyDown = true;
  }
};

var worldLeftKeyDown = function(){

  if(!keyDown){
    if(!moving){
      moveworldleft();
    }

    nextDirection = moveworldleft;
    keyDown = true;
  }
};

var worldUpKeyDown = function(){

  if(!keyDown){
    if(!moving){
      moveworldup();
    }

    nextDirection = moveworldup;
    keyDown = true;
  }
};

var worldDownKeyDown = function(){
  if(!keyDown){
    if(!moving){
      moveworlddown();
    }

    nextDirection = moveworlddown;
    keyDown = true;
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

    var objectPos = objectx+","+objecty;

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
  nextDirection = null;

  // set our character icon to facing right
};

var worldLeftKeyUp = function(){
  keyDown = false;
  nextDirection = null;

  // set our character icon to facing right
};

var worldUpKeyUp = function(){
  keyDown = false;
  nextDirection = null;

  // set our character icon to facing right
};

var worldDownKeyUp = function(){
  keyDown = false;
  nextDirection = null;

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
