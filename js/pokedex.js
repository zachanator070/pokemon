
var pokedexIndex = 1;

var pokedexHeight = 31;
var pokedexYpos = 155;

var pokedexTransitionTime = 50;

var cursorPos = 0;

var pokedexInfo = [];

var showPokemon = function(id){
  $("#pokedexPic").css({'background-image': 'url(' +  pokemon[id].sprites.front_default+ ')'});
}

var setPokedexInfo = function(){

  $("#pokedexList").remove();

  var pokedexString = "<ul id='pokedexList'>";

  pokedexInfo.forEach(function(item){
    pokedexString += "<li>" + item + "</li>";
  });

  pokedexString += "</ul>";

  $("#pokedexright").append(pokedexString);

};

var showPokedex = function(){
  var pokedexString = "<div id='pokedex'></div>";
  var pokedexLeft = "<div id='pokedexleft'></div>";
  var pokedexRight = "<div id='pokedexright'></div>";

  $('#screen').append(pokedexString);

  $('#pokedex').append(pokedexLeft);
  $('#pokedexleft').append("<div id='pokedexPic'></div>");

  $('#pokedex').append(pokedexRight);
  if(Object.keys(pokemon).length == 150){

    for(var i =1;i<=10;i++){
      pokedexInfo.push(pokemon[i].name);
    }

    $('#pokedexright').append("<div id='pokedexselector'></div>");
    $('#pokedexPic').text('');
    showPokemon(1);
    setPokedexInfo();
  }
  else{
    $('#pokedexPic').text('Pokedex still loading, try again later');
  }

};


var dexUpKey = function(){

  if(pokedexIndex >0){
    if(cursorPos > 0){
      $('#pokedexselector').animate({
        top : "-="+pokedexHeight
      }, menuTransitionTime, 'linear');
      cursorPos--;
      pokedexIndex--;
      showPokemon(pokedexIndex);
    }
    else{
      pokedexInfo.splice(9,1);
      pokedexIndex--;
      pokedexInfo.splice(0,0,pokemon[pokedexIndex].name);
      setPokedexInfo();
      showPokemon(pokedexIndex);
    }
  }
  else{
    //play thud sound
  }
};

var dexDownKey = function(){
  if(pokedexIndex <150){
    if(cursorPos< 9){
      $('#pokedexselector').animate({
        top : "+="+pokedexHeight
      }, menuTransitionTime, 'linear');
      cursorPos++;
      pokedexIndex++;
      showPokemon(pokedexIndex);
    }
    else{
      pokedexInfo.splice(0,1);
      pokedexIndex++;
      pokedexInfo.push(pokemon[pokedexIndex].name);
      setPokedexInfo();
      showPokemon(pokedexIndex);
    }
  }
  else{
    //play thud sound
  }
};

var dexzDown = function(){

};

var dexxDown = function(){
  $('#pokedex').remove();
  $('#pokedexselector').remove();
  pokedexInfo = [];
  pokedexIndex = 1;
  cursorPos = 0;
  switchToMenuControls();
};

var switchToPokedexControls = function(){

  resetBindings();
  showPokedex();
  uparrowdown = dexUpKey;
  downarrowdown = dexDownKey;
  zdown = dexzDown;
  xdown = dexxDown;
}
