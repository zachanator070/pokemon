
var pokedexIndex = 0;

var pokedexHeight = 30;
var pokedexYpos = 20;

var pokedexTransitionTime = 50;

var showPokedex = function(){
  var menuString = "<div id='pokedex' class='pokedex'>";
  menuString += "<div id='pokedexPic' class='pokedexPic'></div>";
  menuString += "<ul class='pokedexList'>";
  var pokemon = localStorage.getItem('pokemon');
  for(var i =1;i<=150;i++){
    menuString += "<li class='pokedexItem'>"+pokemon[i].name + "</li>";
  }
  menuString += "</ul></div>";

  $('#screen').append(menuString);

  var selectorString = "<div id='pokedexselector' class='pokedexselector'></div>";
  $('#pokedex').append(selectorString);
};


var dexUpKey = function(){

  if(pokedexIndex > 0){
    console.log('menu going up');
    pokedexIndex--;
    selectorYpos -= pokedexHeight;
    $('#selector').animate({
      top : "-=30"
    }, pokedexTransitionTime,'linear');
  }
};

var dexDownKey = function(){
  if(pokedexIndex <menuItems.length-1){
    console.log('menu going down');
    pokedexIndex++;
    selectorYpos += pokedexHeight;
    $('#selector').animate({
      top : "+=30"
    }, pokedexTransitionTime, 'linear');
  }
};

var menuzDown = function(){

};

var menuxDown = function(){
  $('#menu').remove();
  $('selector').remove();
  pokedexIndex = 0;
  switchToMenuControls();
};

var switchToMenuControls = function(){

  resetBindings();
  showMenu();
  uparrowdown = menuUpKeyDown;
  downarrowdown = menuDownKeyDown;
  zdown = menuzDown;
  xdown = menuxDown;
}
