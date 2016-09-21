
var pokedexIndex = 0;

var pokedexHeight = 30;
var pokedexYpos = 20;

var pokedexTransitionTime = 50;

var showMenu = function(){
  var menuString = "<div id='pokedex' class='pokedex'><ul class='pokedexList'>";
  localStorage.getItem('pokemon').forEach(function(item){
    menuString += "<li class='pokedexitem'>"+item+"</li>";
  });
  menuString += "</ul></div>";

  $('#screen').append(menuString);

  var selectorString = "<div id='pokedexselector' class='pokedexselector'></div>";
  $('#pokedex').append(selectorString);
};


var menuUpKeyDown = function(){

  if(pokedexIndex > 0){
    console.log('menu going up');
    pokedexIndex--;
    selectorYpos -= pokedexHeight;
    $('#selector').animate({
      top : "-=30"
    }, pokedexTransitionTime,'linear');
  }
};

var menuDownKeyDown = function(){
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
  switchToWorldControls();
};

var switchToMenuControls = function(){

  resetBindings();
  showMenu();
  uparrowdown = menuUpKeyDown;
  downarrowdown = menuDownKeyDown;
  zdown = menuzDown;
  xdown = menuxDown;
}
