
var menuItems = ['Pokedex','Pokemon'];
var menuIndex = 0;

var menuItemHeight = 30;
var selectorYpos = 20;

var menuTransitionTime = 50;

var showMenu = function(){
  var menuString = "<div id='menu' class='menu'><ul class='menuList'>";
  menuItems.forEach(function(item){
    menuString += "<li class='menuitem'>"+item+"</li>";
  });
  menuString += "</ul></div>";

  $('#screen').append(menuString);

  var selectorString = "<div id='selector' class='selector'></div>";
  $('#menu').append(selectorString);
};


var menuUpKeyDown = function(){

  if(menuIndex > 0){
    console.log('menu going up');
    menuIndex--;
    selectorYpos -= menuItemHeight;
    $('#selector').animate({
      top : "-=30"
    }, menuTransitionTime,'linear');
  }
};

var menuDownKeyDown = function(){
  if(menuIndex <menuItems.length-1){
    console.log('menu going down');
    menuIndex++;
    selectorYpos += menuItemHeight;
    $('#selector').animate({
      top : "+=30"
    }, menuTransitionTime, 'linear');
  }
};

var menuzDown = function(){
  if(menuIndex == 0){
    switchToPokedexControls();
  }
  if(menuIndex == 1){
    switchToPartyControls();
  }
};

var menuxDown = function(){
  $('#menu').remove();
  $('selector').remove();
  menuIndex = 0;
  switchToWorldControls();
};

var switchToMenuControls = function(){

  resetBindings();
  if (!jQuery.contains(document, $('#menu')[0])) {
    showMenu();
  }
  uparrowdown = menuUpKeyDown;
  downarrowdown = menuDownKeyDown;
  zdown = menuzDown;
  xdown = menuxDown;
}
