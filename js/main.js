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
    console.log('moving to world...');
    $('#intro').fadeOut(400,function(){
        $('#intro').remove();
        switchToWorldControls();
    });
  };

}

function loadPokedexData(pokemon){
  var urls = [];
  var promises = [];
  var minReq = [];

  for(var i =pokemon.length+1;i<=150;i++){

    var promise = $.ajax("http://pokeapi.co/api/v2/pokemon/"+i,{
      success: function(data){
        urls.push(data.sprites.back_default);
        urls.push(data.sprites.front_default);
        pokemon.push(data);
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
      localStorage.setItem('pokemon',pokemon);
    },
    function(){
      console.log("images didn't load");
    }
  );

  Promise.all(minReq).then(function(){
    pressStart();
  });
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

  // load images into browser cache
  var pokemon = localStorage.getItem("pokemon");

  if(pokemon === null) {
    pokemon = [];
    loadPokedexData(pokemon);
    $('#loadingImage').append("<img src='images/pikachu.gif' class='pikachu'/>");
    $("#loadingText").text('Loading Pokedex...');
  }
  else if(pokemon.length < 150){
    loadPokedexData(pokemon);
    $('#loadingImage').append("<img src='images/pikachu.gif' class='pikachu'/>");
    $("#loadingText").text('Loading Pokedex...');
  }
  else{
    console.log('pokedex already loaded');
    pressStart();
  }

  $("#loadingText").blink({delay:800});


  // disable window controls
  window.onkeydown = function(e) {
    return !(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40);
  };

});
