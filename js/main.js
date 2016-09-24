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
          move.url = group.move.url;
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
          some.types.push(slot.type.name);
        });
        some.height = data.height;
        some.weight = data.weight;
        pokemon[id] = some;
        console.log('Looked up '+data.name);
        // lookup flavor text
        $.ajax("http://pokeapi.co/api/v2/pokemon-species/"+id,{
          success: function(info){
            var text = "";
            info.flavor_text_entries.forEach(function(entry){
              if(entry.version.name == "firered" && entry.language.name == "en"){
                text = entry.flavor_text;
              }
            });
            if(text != ""){
              pokemon[id].flavor_text = text;
            }
            console.log('got flavor text for '+id);
          },
          error: function(info){
              console.log('unable to load species info '+id);
          }
        });
      },
      error: function(data,code){
        console.log("Error "+code+" requesting image url: "+data);
      }
    });

    promises.push(promise);
    if(minReq.length <9){
      minReq.push(promise)
    }
  }

  Promise.all(promises).then(function(){
      preloadImages(urls);
      if(localStorage.getItem('moves') == null){
        loadMoves();
      }
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

  $.ajax('aws.thezachcave.com/pokemon/moves.json',{
    success: function(data){
      moves = data;
      localStorage.setItem('moves',moves);
    },
    error: function(data){
      console.log('error retrieving moves');
    }
  });
  /*
  var movePromises = [];
  moves = {};
  for(var i =1; i<=150;i++){
    pokemon[i].moves.forEach(function(move){
      if(!(move.name in moves)){
        moves[move.name] = {};
        var movePromise = $.ajax(move.url,{
          success: function(response){
            var newMove = {};
            newMove.pp = response.pp;
            newMove.name = response.name;
            newMove.power = response.power;
            newMove.accuracy = response.accuracy;
            if('damage_class' in Object.keys(response)){
              newMove.damage_class = response.damage_class.name;
            }
            newMove.type = response.type.name;
            moves[move.name] = newMove;
            console.log('loaded '+move.name);
          },
          error: function(response){
            console.log('unable to load '+move.name)
          }
        });

        movePromises.push(movePromise);
      }
    });
  }

  Promise.all(movePromises).then(function(){
    console.log(moves);
    localStorage.setItem('moves',JSON.stringify(moves));
    //pressStart();
  });
  */
}

var worldMusic = new Audio('sounds/opening.mp3');

function startWorldMusic(){
  worldMusic = new Audio('sounds/opening.mp3');
  worldMusic.play();
  worldMusic.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
}

// when the document is ready to go
$(function() {

  focusScreen();

  console.log( "ready!" );

  startWorldMusic();

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
