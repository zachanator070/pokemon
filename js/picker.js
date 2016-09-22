
var menuItems = ['Bulbasaur','Charmander',''];
var menuIndex = 0;

var menuItemHeight = 30;
var selectorYpos = 20;

var menuTransitionTime = 50;

var showPicker = function(){
  var menuString = "<div id='picker'><ul class='pickerList'>";
  menuItems.forEach(function(item){
    menuString += "<li>"+item+"</li>";
  });
  menuString += "</ul></div>";

  $('#screen').append(menuString);

  var selectorString = "<div id='selector' class='selector'></div>";
  $('#menu').append(selectorString);
};


var pickerUpKey = function(){


};

var pickerDownKey = function(){
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

};

var menuxDown = function(){
  $('#menu').remove();
  $('selector').remove();
  menuIndex = 0;
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
