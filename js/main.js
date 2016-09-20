var focusScreen = function(){
  console.log('screen focused');
  $('#screen').focus();
};

var leftarrowdown ;

var uparrowdown ;

var downarrowdown ;

var rightarrowdown ;

var leftarrowup ;

var uparrowup ;

var downarrowup ;

var rightarrowup ;

var zdown ;

var xdown ;

var enterdown ;

var resetBindings = function(){
  leftarrowdown = function() {
    console.log('leftarrow');
  };

  uparrowdown = function() {
    console.log('uparrow');
  };

  downarrowdown = function() {
    console.log('downarrow');
  };

  rightarrowdown = function() {
    console.log('rightarrow');
  };

  leftarrowup = function() {
    console.log('leftarrow');
  };

  uparrowup = function() {
    console.log('uparrow');
  };

  downarrowup = function() {
    console.log('downarrow');
  };

  rightarrowup = function() {
    console.log('rightarrow');
  };

  zdown = function(){
    console.log('z');
  };

  xdown = function(){
    console.log('x');
  };

  enterdown = function(){
    console.log('enter');
  };
}

// whend the document is ready to go
$(function() {
  focusScreen();
  console.log( "ready!" );
  $("#screen").keydown( function(event) {

    var key = event.which;
    switch (key){
      case 37:
        leftarrowdown();
        break;
      case 38:
        uparrowdown();
        break;
      case 39:
        rightarrowdown();
        break;
      case 40:
        downarrowdown();
        break;
      case 90:
        zdown();
        break;
      case 88:
        xdown();
        break;
      case 13:
        enterdown();
        break;
      default:
        console.log('key pressed:'+key);
        break;
    }

  });

  $("#screen").keyup( function(event) {

    var key = event.which;
    switch (key){
      case 37:
        leftarrowup();
        break;
      case 38:
        uparrowup();
        break;
      case 39:
        rightarrowup();
        break;
      case 40:
        downarrowup();
        break;
    }

  });

  //////////////////////////////////////////
  // Here we start the initial game state //
  //////////////////////////////////////////
  switchToWorldControls();

  // disable window controls
  window.onkeydown = function(e) {
    return !(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40);
  };

});
