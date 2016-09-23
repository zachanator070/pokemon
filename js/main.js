var focusScreen = function(){
  $('#screen').focus();
  console.log('screen focused');
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

var pokemon = {};
var moves = {};
var party = [];

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

function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
            console.log("Downloaded "+img.src);
        }
        list.push(img);
        img.src = array[i];
    }
}

function pressStart(){

  //$('#loadingImage').append("<img src='images/pikachu.gif' class='pikachu'/>");
  //$("#loadingText").text('Loading Pokedex...');

  $("#loadingImage").remove();
  $("#loadingText").text("Press 'Z' to start");
  zdown = function(){
    var audio = new Audio('sounds/beep.mp3');
    audio.play();
    console.log('moving to world...');
    $('#intro').fadeOut(400,function(){
        $('#intro').remove();
        switchToWorldControls();
    });
  };

}

function loadPokedexData(){
  var urls = [];
  var promises = [];
  var minReq = [];

  pokemon = {};

  for(var i =1;i<=150;i++){

    var promise = $.ajax("http://pokeapi.co/api/v2/pokemon/"+i,{
      success: function(data){
        urls.push(data.sprites.back_default);
        urls.push(data.sprites.front_default);
        var id = data.id;
        var some = {};
        some.name = data.name;
        some.id = data.id;
        some.types = data.types;
        some.sprites = data.sprites;
        some.stats = data.stats;
        some.exp = data.base_experience;
        var moves = [];
        // parsing out the moves
        data.moves.forEach(function(group){
          var move = {};
          var using = false;
          move.name = group.move.name;
          move.url = move.url;
          group.version_group_details.forEach(function(detail){
            if(detail.version_group.name == 'firered-leafgreen'){
              using = true;
              move.level = detail.level_learned_at;
            }
          });
          if(using){
            moves.push(move);
          }
        });
        some.moves = moves;
        some.types = [];
        data.types.forEach(function(slot){
          some.types.push(slot.name);
        });
        some.height = data.height;
        some.weight = some.weight;

        pokemon[id] = some;
        console.log('Looked up '+data.name);
      },
      error: function(data,code){
        console.log("Error "+code+" requesting image url: "+data);
      }
    });

    promises.push(promise);
    if(i < 9){
      minReq.push(promise);
    }
  }

  Promise.all(promises).then(function(){
      preloadImages(urls);
      loadMoves();
      localStorage.setItem('pokemon',JSON.stringify(pokemon));
    },
    function(){
      console.log("images didn't load");
    }
  );

  Promise.all(minReq).then(function(){
    pressStart();
  });
}

function loadMoves(){
  var movePromises = [];
  moves = [];
  for(var i =1; i<=150;i++){
    pokemon[i].moves.forEach(function(move){
      if(!(move.name in moves)){
        moves[move.name] = {};
        var movePromise = $.ajax(move.url,{
          success: function(data){
            var newMove = {};
            newMove.pp = data.pp;
            newMove.name = data.name;
            newMove.power = data.power;
            newMove.accuracy = data.accuracy;
            if('damage_class' in Object.keys(data)){
              newMove.class = data.damage_class.name;
            }
            newMove['type'] = data['type']['name'];
            moves[move.name] = newMove;
            console.log('loaded '+move.name)
          },
          error: function(data){
            console.log('unable to load '+move.name)
          }
        });

        movePromises.push(movePromise);
      }
    });
  }

  Promise.all(movePromises).then(function(){
    localStorage.set('moves',JSON.stringify(moves));
  });
}

// when the document is ready to go
$(function() {

  focusScreen();

  console.log( "ready!" );

  var audio = new Audio('sounds/opening.mp3');
  audio.play();

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

  // load images into browser cache
  pokemon = JSON.parse(localStorage.getItem("pokemon"));
  moves = JSON.parse(localStorage.getItem("moves"));
  if(pokemon === null || Object.keys(pokemon).length < 150) {
    loadPokedexData();
    $('#loadingImage').append("<img src='images/pikachu.gif' class='pikachu'/>");
    $("#loadingText").text('Loading Pokedex...');
  }
  else{
    if(moves == null){
      loadMoves();
    }
    pressStart();
  }

  $("#loadingText").blink({delay:800});

  // disable window controls
  window.onkeydown = function(e) {
    return !(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40);
  };

});
